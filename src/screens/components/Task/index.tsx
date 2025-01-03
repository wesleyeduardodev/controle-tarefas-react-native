import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";

export type TaskProps = {
    name: string;
    isCompleted: boolean;
    onToggleStatus: () => void;
    onRemove: () => void;
};

export function Task({ name, isCompleted, onToggleStatus, onRemove }: TaskProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onToggleStatus} style={styles.checkboxContainer}>
                <Text style={styles.checkbox}>
                    {isCompleted ? "✅" : "⬜️"}
                </Text>
            </TouchableOpacity>
            <Text style={[styles.name, isCompleted && styles.nameCompleted]}>
                {name}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onRemove}>
                <Icon name="delete" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}
