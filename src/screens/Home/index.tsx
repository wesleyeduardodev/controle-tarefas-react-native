import { useState, useEffect } from "react";
import {
    Alert,
    FlatList,
    Modal,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Task, TaskProps } from "../components/Task";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesHome } from "./style";
import { api } from "../services/api";
import DateTimePicker from "@react-native-community/datetimepicker";

export function Home() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [hasAlarm, setHasAlarm] = useState(false);
    const [alarmTime, setAlarmTime] = useState<string | undefined>(undefined);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<TaskProps | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks/v1");
            setTasks(response.data);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as tarefas.");
            console.error("Erro:", error);
        }
    };

    const addTask = async () => {
        if (taskName.trim() === "") {
            return Alert.alert("Nome inválido", "O nome da tarefa não pode estar vazio.");
        }

        if (hasAlarm && !alarmTime) {
            return Alert.alert("Alarme inválido", "Defina um horário para o alarme.");
        }

        try {
            const response = await api.post("/tasks/v1", {
                title: taskName,
                description: taskDescription,
                completed: false,
                hasAlarm,
                alarmTime,
            });
            setTasks((prevState) => [...prevState, response.data]);
            setTaskName("");
            setTaskDescription("");
            setHasAlarm(false);
            setAlarmTime(undefined);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const editTask = async (id: number, updatedTask: Partial<TaskProps>) => {
        try {
            await api.put(`/tasks/v1/${id}`, updatedTask);
            setTasks((prevState) =>
                prevState.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
            );
        } catch (error) {
            Alert.alert("Erro", "Não foi possível editar a tarefa.");
            console.error("Erro ao editar tarefa:", error);
        }
    };

    const toggleTaskStatus = async (id: number, currentStatus: boolean) => {
        try {
            const taskToUpdate = tasks.find((task) => task.id === id);
            if (!taskToUpdate) {
                Alert.alert("Erro", "Tarefa não encontrada.");
                return;
            }

            await api.put(`/tasks/v1/${id}`, {
                title: taskToUpdate.title,
                completed: !currentStatus,
            });

            setTasks((prevState) =>
                prevState.map((task) =>
                    task.id === id ? { ...task, completed: !currentStatus } : task
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar a tarefa:", error);
            Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
        }
    };

    const removeTask = async (id: number) => {
        try {
            await api.delete(`/tasks/v1/${id}`);
            setTasks((prevState) => prevState.filter((task) => task.id !== id));
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover a tarefa.");
            console.error("Erro:", error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const createdTasksCount = tasks.length;
    const completedTasksCount = tasks.filter((task) => task.completed).length;
    const pendingTasksCount = createdTasksCount - completedTasksCount;

    const handleEditTask = (task: TaskProps) => {
        setTaskToEdit(task);
        setIsEditModalVisible(true);
    };

    const saveTaskChanges = async () => {
        if (taskToEdit) {
            await editTask(taskToEdit.id, {
                title: taskToEdit.title,
                description: taskToEdit.description,
                hasAlarm: taskToEdit.hasAlarm,
                alarmTime: taskToEdit.alarmTime,
            });
            setIsEditModalVisible(false);
            setTaskToEdit(null);
        }
    };

    return (
        <View style={stylesHome.container}>
            <View style={stylesHome.logoContainer}>
                <Icon name="calendar-today" size={64} color="#31CF67" style={stylesHome.icon} />
                <Text style={stylesHome.appName}>Minha Agenda</Text>
            </View>
            <View style={stylesHome.form}>
                <TextInput
                    style={stylesHome.input}
                    placeholder="Título da Tarefa"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setTaskName}
                    value={taskName}
                />
                <TextInput
                    style={stylesHome.input}
                    placeholder="Descrição"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setTaskDescription}
                    value={taskDescription}
                />
                <View style={stylesHome.alarmSection}>
                    <Text style={stylesHome.label}>Ativar Alarme?</Text>
                    <Switch
                        value={hasAlarm}
                        onValueChange={(value) => {
                            setHasAlarm(value);
                            if (!value) setAlarmTime(undefined);
                        }}
                    />
                </View>
                {hasAlarm && (
                    <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        style={stylesHome.timePickerButton}
                    >
                        <Text style={stylesHome.timePickerText}>
                            {alarmTime
                                ? `Alarme: ${new Date(alarmTime).toLocaleString()}`
                                : "Definir Horário"}
                        </Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={stylesHome.addButton} onPress={addTask}>
                    <Icon name="add" size={24} color="#fff" />
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={alarmTime ? new Date(alarmTime) : new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={(event, selectedTime) => {
                            setShowTimePicker(false);
                            if (selectedTime) setAlarmTime(selectedTime.toISOString());
                        }}
                    />
                )}
            </View>

            <View style={stylesHome.taskInfoContainer}>
                <TouchableOpacity
                    style={[
                        stylesHome.infoBlock,
                        filter === "all" && stylesHome.infoBlockActive,
                    ]}
                    onPress={() => setFilter("all")}
                >
                    <Text style={stylesHome.labelCreated}>Criadas</Text>
                    <View style={stylesHome.circle}>
                        <Text style={stylesHome.number}>{createdTasksCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        stylesHome.infoBlock,
                        filter === "pending" && stylesHome.infoBlockActive,
                    ]}
                    onPress={() => setFilter("pending")}
                >
                    <Text style={stylesHome.labelPending}>Pendentes</Text>
                    <View style={stylesHome.circle}>
                        <Text style={stylesHome.number}>{pendingTasksCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        stylesHome.infoBlock,
                        filter === "completed" && stylesHome.infoBlockActive,
                    ]}
                    onPress={() => setFilter("completed")}
                >
                    <Text style={stylesHome.labelCompleted}>Concluídas</Text>
                    <View style={stylesHome.circle}>
                        <Text style={stylesHome.number}>{completedTasksCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Task
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        completed={item.completed}
                        hasAlarm={item.hasAlarm}
                        alarmTime={item.alarmTime}
                        onToggleStatus={() => toggleTaskStatus(item.id, item.completed)}
                        onRemove={() => removeTask(item.id)}
                        onEdit={() => handleEditTask(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>
                        Nenhuma tarefa foi adicionada ainda. Crie uma nova tarefa para começar.
                    </Text>
                )}
            />

            {isEditModalVisible && (
                <Modal visible={isEditModalVisible} animationType="slide">
                    <View style={stylesHome.modalContainer}>
                        <TextInput
                            style={stylesHome.input}
                            value={taskToEdit?.title}
                            onChangeText={(text) =>
                                setTaskToEdit({ ...taskToEdit!, title: text })
                            }
                            placeholder="Título"
                        />
                        <TextInput
                            style={stylesHome.input}
                            value={taskToEdit?.description}
                            onChangeText={(text) =>
                                setTaskToEdit({ ...taskToEdit!, description: text })
                            }
                            placeholder="Descrição"
                        />
                        <View style={stylesHome.alarmSection}>
                            <Text style={stylesHome.label}>Ativar Alarme?</Text>
                            <Switch
                                value={taskToEdit?.hasAlarm || false}
                                onValueChange={(value) =>
                                    setTaskToEdit({
                                        ...taskToEdit!,
                                        hasAlarm: value,
                                        alarmTime: undefined,
                                    })
                                }
                            />
                        </View>
                        {taskToEdit?.hasAlarm && (
                            <TouchableOpacity
                                onPress={() => setShowTimePicker(true)}
                                style={stylesHome.timePickerButton}
                            >
                                <Text style={stylesHome.timePickerText}>
                                    {taskToEdit.alarmTime
                                        ? `Alarme: ${new Date(
                                            taskToEdit.alarmTime
                                        ).toLocaleString()}`
                                        : "Definir Horário"}
                                </Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={stylesHome.addButton}
                            onPress={saveTaskChanges}
                        >
                            <Text style={stylesHome.buttonText}>Salvar Alterações</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={stylesHome.cancelButton}
                            onPress={() => {
                                setIsEditModalVisible(false);
                                setTaskToEdit(null);
                            }}
                        >
                            <Text style={stylesHome.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
}
