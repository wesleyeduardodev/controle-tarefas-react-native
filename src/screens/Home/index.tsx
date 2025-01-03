import {useState} from "react";
import {Alert, FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Task, TaskProps} from "../components/Task";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from "./style";

export function Home() {

    const [tasks, setTasks] = useState<TaskProps[]>([]);
    const [taskName, setTaskName] = useState('');

    return (
        <View style={styles.container}>
            {viewImage()}
            {viewAddTask()}
            {viewTasksInfo()}
            {listTasks()}
        </View>
    )

    function viewImage() {
        return (
            <View style={styles.logoContainer}>
                <Icon name="rocket" size={64} color="#31CF67" style={styles.icon}/>
                <Text style={styles.appName}>Controle de Tarefas</Text>
            </View>
        );
    }

    function viewAddTask() {
        return <View style={styles.form}>
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
        </View>;
    }

    function viewTasksInfo() {
        const completedTasksCount = tasks.filter((task) => task.isCompleted).length;
        const createdTasksCount = tasks.length;
        return (
            <View style={styles.taskInfoContainer}>
                <View style={styles.infoBlock}>
                    <Text style={styles.labelCreated}>Criadas</Text>
                    <View style={styles.circle}>
                        <Text style={styles.number}>{createdTasksCount}</Text>
                    </View>
                </View>
                <View style={styles.infoBlock}>
                    <Text style={styles.labelCompleted}>Concluídas</Text>
                    <View style={styles.circle}>
                        <Text style={styles.number}>{completedTasksCount}</Text>
                    </View>
                </View>
            </View>
        );
    }

    function addTask() {
        if (taskName.trim() === '') {
            return Alert.alert(
                "Nome inválido",
                "O nome da tarefa não pode estar vazio."
            );
        }
        if (tasks.some((task) => task.name === taskName)) {
            return Alert.alert(
                "Tarefa existe",
                "Já existe uma tarefa na lista com esse nome."
            );
        }
        const newTask: TaskProps = {
            name: taskName,
            isCompleted: false,
            onToggleStatus: () => toggleTaskStatus(taskName),
            onRemove: () => removeTask(taskName),
        };
        setTasks((prevState) => [...prevState, newTask]);
        setTaskName('');
    }

    function toggleTaskStatus(name: string) {
        setTasks((prevState) =>
            prevState.map((task) =>
                task.name === name ? {...task, isCompleted: !task.isCompleted} : task
            )
        );
    }

    function removeTask(name: string) {
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
    }

    function listTasks() {
        return (
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
    }
}