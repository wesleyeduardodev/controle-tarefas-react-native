import { useState, useEffect } from "react";
import {
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Task, TaskProps } from "../components/Task";
import { FormModal } from "../components/Task/FormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesHome } from "./style";
import { api } from "../services/api";

export function Home() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    const handleAddTask = async (newTask: TaskProps) => {
        try {
            const response = await api.post("/tasks/v1", newTask);
            setTasks((prevState) => [...prevState, response.data]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
            console.error("Erro ao adicionar tarefa:", error);
        }
    };

    const handleEditTask = async (id: number, updatedTask: Partial<TaskProps>) => {
        try {
            const existingTask = tasks.find((task) => task.id === id);
            if (!existingTask) {
                Alert.alert("Erro", "Tarefa não encontrada.");
                return;
            }

            const mergedTask = { ...existingTask, ...updatedTask };

            await api.put(`/tasks/v1/${id}`, mergedTask);
            setTasks((prevState) =>
                prevState.map((task) => (task.id === id ? mergedTask : task))
            );
        } catch (error) {
            Alert.alert("Erro", "Não foi possível editar a tarefa.");
            console.error("Erro ao editar tarefa:", error);
        }
    };

    const handleRemoveTask = async (id: number) => {
        try {
            await api.delete(`/tasks/v1/${id}`);
            setTasks((prevState) => prevState.filter((task) => task.id !== id));
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover a tarefa.");
            console.error("Erro ao remover tarefa:", error);
        }
    };

    const handleToggleTaskStatus = async (id: number, currentStatus: boolean) => {
        try {
            const taskToUpdate = tasks.find((task) => task.id === id);
            if (!taskToUpdate) {
                Alert.alert("Erro", "Tarefa não encontrada.");
                return;
            }

            const updatedTask = {
                ...taskToUpdate,
                completed: !currentStatus,
            };

            await api.put(`/tasks/v1/${id}`, updatedTask);

            setTasks((prevState) =>
                prevState.map((task) =>
                    task.id === id ? updatedTask : task
                )
            );
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
            console.error("Erro ao atualizar a tarefa:", error);
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

    return (
        <View style={stylesHome.container}>
            <TouchableOpacity
                style={stylesHome.addButton}
                onPress={() => {
                    setTaskToEdit(null);
                    setIsModalVisible(true);
                }}
            >
                <Icon name="add" size={28} color="#FFF" />
                <Text style={stylesHome.addButtonText}>Adicionar Lembrete</Text>
            </TouchableOpacity>

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
                        onToggleStatus={() => handleToggleTaskStatus(item.id, item.completed)}
                        onRemove={() => handleRemoveTask(item.id)}
                        onEdit={() => {
                            setTaskToEdit(item);
                            setIsModalVisible(true);
                        }}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>
                        Nenhuma tarefa foi adicionada ainda. Crie uma nova tarefa para começar.
                    </Text>
                )}
            />

            {isModalVisible && (
                <FormModal
                    visible={isModalVisible}
                    task={taskToEdit}
                    onSave={(task) => {
                        if (!task.title || !task.title.trim()) {
                            Alert.alert("Validação", "O nome da tarefa é obrigatório.");
                            return;
                        }
                        if (taskToEdit) {
                            handleEditTask(taskToEdit.id, task);
                        } else {
                            handleAddTask(task as TaskProps);
                        }
                        setIsModalVisible(false);
                    }}
                    onClose={() => setIsModalVisible(false)}
                />
            )}
        </View>
    );
}
