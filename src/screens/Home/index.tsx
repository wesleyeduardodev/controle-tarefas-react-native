import {useState, useEffect} from "react";
import {Alert, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Task, TaskProps} from "../components/Task";
import Icon from "react-native-vector-icons/MaterialIcons";
import {styles} from "./style";
import {api} from "../services/api";

export function Home() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [taskName, setTaskName] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    // Carregar tarefas ao montar o componente
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks/v1");
            setTasks(response.data);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar as tarefas.");
            console.log("Erro", "Não foi possível carregar as tarefas.");
            console.log(error);
        }
    };

    const addTask = async () => {
        if (taskName.trim() === "") {
            return Alert.alert("Nome inválido", "O nome da tarefa não pode estar vazio.");
        }

        try {
            const response = await api.post("/tasks/v1", {
                name: taskName,
                completed: false,
            });
            setTasks((prevState) => [...prevState, response.data]);
            setTaskName("");
        } catch (error) {
            console.log("Erro", "Não foi possível carregar as tarefas.");
            console.log(error);
            Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
        }
    };

    const toggleTaskStatus = async (id: number, currentStatus: boolean) => {
        try {
            // Obtenha a tarefa atual pelo ID
            const taskToUpdate = tasks.find((task) => task.id === id);
            if (!taskToUpdate) {
                Alert.alert("Erro", "Tarefa não encontrada.");
                return;
            }

            // Envie o nome e o novo status no corpo do PUT
            await api.put(`/tasks/v1/${id}`, {
                name: taskToUpdate.name, // Inclua o nome da tarefa
                completed: !currentStatus, // Inverte o status atual
            });

            // Atualize a lista de tarefas no estado
            setTasks((prevState) =>
                prevState.map((task) =>
                    task.id === id ? { ...task, completed: !currentStatus } : task
                )
            );
        } catch (error) {
            console.log("Erro ao atualizar a tarefa:", error);
            Alert.alert("Erro", "Não foi possível atualizar a tarefa.");
        }
    };


    const removeTask = async (id: number) => {
        try {
            await api.delete(`/tasks/v1/${id}`);
            setTasks((prevState) => prevState.filter((task) => task.id !== id));
        } catch (error) {
            console.log("Erro", "Não foi possível carregar as tarefas.");
            console.log(error);
            Alert.alert("Erro", "Não foi possível remover a tarefa.");
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
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.logoContainer}>
                <Icon name="rocket" size={64} color="#31CF67" style={styles.icon}/>
                <Text style={styles.appName}>Controle de Tarefas</Text>
            </View>

            {/* Formulário de Adição */}
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Adicione uma nova tarefa"
                    placeholderTextColor="#6B6B6B"
                    onChangeText={setTaskName}
                    value={taskName}
                />
                <TouchableOpacity style={styles.button} onPress={addTask}>
                    <Icon name="add" size={24} color="#fff"/>
                </TouchableOpacity>
            </View>

            {/* Informações de Tarefas */}
            <View style={styles.taskInfoContainer}>
                <TouchableOpacity
                    style={[styles.infoBlock, filter === "all" && styles.infoBlockActive]}
                    onPress={() => setFilter("all")}
                >
                    <Text style={styles.labelCreated}>Criadas</Text>
                    <View style={styles.circle}>
                        <Text style={styles.number}>{createdTasksCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.infoBlock, filter === "pending" && styles.infoBlockActive]}
                    onPress={() => setFilter("pending")}
                >
                    <Text style={styles.labelPending}>Pendentes</Text>
                    <View style={styles.circle}>
                        <Text style={styles.number}>{pendingTasksCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.infoBlock, filter === "completed" && styles.infoBlockActive]}
                    onPress={() => setFilter("completed")}
                >
                    <Text style={styles.labelCompleted}>Concluídas</Text>
                    <View style={styles.circle}>
                        <Text style={styles.number}>{completedTasksCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Lista de Tarefas */}
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <Task
                        id={item.id} // Passando o id
                        name={item.name}
                        completed={item.completed}
                        onToggleStatus={() => toggleTaskStatus(item.id, item.completed)}
                        onRemove={() => removeTask(item.id)}
                    />

                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Nenhuma tarefa foi adicionada ainda. Crie uma nova tarefa para começar.
                    </Text>
                )}
            />
        </View>
    );
}
