import {useState} from "react";
import {Alert, FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Task, TaskProps} from "../components/Task";
import Icon from "react-native-vector-icons/MaterialIcons";
import {styles} from "./style";

export function Home() {
    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [taskName, setTaskName] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    const addTask = () => {
        if (taskName.trim() === "") {
            return Alert.alert("Nome inválido", "O nome da tarefa não pode estar vazio.");
        }

        if (tasks.some((task) => task.name === taskName)) {
            return Alert.alert("Tarefa existe", "Já existe uma tarefa na lista com esse nome.");
        }

        const newTask: TaskProps = {
            name: taskName,
            isCompleted: false,
            onToggleStatus: () => toggleTaskStatus(taskName),
            onRemove: () => removeTask(taskName),
        };

        setTasks((prevState) => [...prevState, newTask]);
        setTaskName("");
    };

    const toggleTaskStatus = (name: string) => {
        setTasks((prevState) =>
            prevState.map((task) =>
                task.name === name ? {...task, isCompleted: !task.isCompleted} : task
            )
        );
    };

    const removeTask = (name: string) => {
        Alert.alert("Remover", `Remover a tarefa "${name}"?`, [
            {
                text: "Sim",
                onPress: () =>
                    setTasks((prevState) => prevState.filter((task) => task.name !== name)),
            },
            {
                text: "Não",
                style: "cancel",
            },
        ]);
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "pending") return !task.isCompleted;
        if (filter === "completed") return task.isCompleted;
        return true; // "all" filter
    });

    return (
        <View style={styles.container}>
            <Header/>
            <AddTaskForm taskName={taskName} setTaskName={setTaskName} addTask={addTask}/>
            <TaskInfo tasks={tasks} filter={filter} setFilter={setFilter}/>
            <TaskList tasks={filteredTasks}/>
        </View>
    );
}

const Header = () => (
    <View style={styles.logoContainer}>
        <Icon name="rocket" size={64} color="#31CF67" style={styles.icon}/>
        <Text style={styles.appName}>Controle de Tarefas</Text>
    </View>
);

const AddTaskForm = ({
                         taskName,
                         setTaskName,
                         addTask,
                     }: {
    taskName: string;
    setTaskName: (name: string) => void;
    addTask: () => void;
}) => (
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
);

const TaskInfo = ({
                      tasks,
                      filter,
                      setFilter,
                  }: {
    tasks: TaskProps[];
    filter: "all" | "pending" | "completed";
    setFilter: (filter: "all" | "pending" | "completed") => void;
}) => {
    const createdTasksCount = tasks.length;
    const completedTasksCount = tasks.filter((task) => task.isCompleted).length;
    const pendingTasksCount = createdTasksCount - completedTasksCount;

    return (
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
    );
};

const TaskList = ({tasks}: { tasks: TaskProps[] }) => (
    <FlatList
        data={tasks}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => (
            <Task
                name={item.name}
                isCompleted={item.isCompleted}
                onToggleStatus={item.onToggleStatus}
                onRemove={item.onRemove}
            />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
                Nenhuma tarefa foi adicionada ainda. Crie uma nova tarefa para começar.
            </Text>
        )}
    />
);
