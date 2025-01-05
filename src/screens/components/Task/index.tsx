import {Alert, Text, TouchableOpacity, View} from "react-native";
import {stylesTask} from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";

export type TaskProps = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    hasAlarm: boolean;
    alarmTime?: string;
    onToggleStatus: () => void;
    onRemove: () => void;
    onEdit: () => void;
};

export function Task({
                         title,
                         completed,
                         hasAlarm,
                         alarmTime,
                         onToggleStatus,
                         onRemove,
                         onEdit,
                     }: TaskProps) {
    return (
        <View style={[stylesTask.container, completed && stylesTask.containerCompleted]}>
            <TouchableOpacity onPress={onToggleStatus} style={stylesTask.checkboxContainer}>
                <View style={[stylesTask.checkbox, completed && stylesTask.checked]}>
                    {completed && <Icon name="check" size={16} color="#FFF"/>}
                </View>
            </TouchableOpacity>
            <View style={stylesTask.taskDetails}>
                <Text style={[stylesTask.title, completed && stylesTask.titleCompleted]}>
                    {title}
                </Text>
                {hasAlarm && alarmTime && (
                    <Text style={stylesTask.alarmText}>
                        ⏰ {new Date(alarmTime).toLocaleDateString()} às {new Date(alarmTime).toLocaleTimeString()}
                    </Text>
                )}
            </View>
            <TouchableOpacity style={stylesTask.editTask} onPress={onEdit}>
                <Icon name="edit" size={24} color="#FFF"/>
            </TouchableOpacity>
            <TouchableOpacity
                style={stylesTask.button}
                onPress={() =>
                    Alert.alert(
                        "Confirmar Remoção",
                        `Você tem certeza que deseja remover a tarefa "${title}"?`,
                        [
                            {
                                text: "Não",
                                style: "cancel",
                            },
                            {
                                text: "Sim",
                                style: "destructive",
                                onPress: onRemove,
                            },
                        ]
                    )
                }
            >
                <Icon name="delete" size={24} color="#FFF" />
            </TouchableOpacity>

        </View>
    );
}
