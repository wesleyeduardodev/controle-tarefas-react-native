import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";

export type TaskProps = {
    id: number;
    name: string;
    completed: boolean;
    onToggleStatus: () => void;
    onRemove: () => void;
};

export function Task({name, completed, onToggleStatus, onRemove}: TaskProps) {
    return (
        <View style={[styles.container, completed && styles.containerCompleted]}>
            <TouchableOpacity onPress={onToggleStatus} style={styles.checkboxContainer}>
                <View style={[styles.checkbox, completed && styles.checked]}>
                    {completed && <Icon name="check" size={16} color="#FFF"/>}
                </View>
            </TouchableOpacity>
            <Text style={[styles.name, completed && styles.nameCompleted]}>
                {name}
            </Text>
            <TouchableOpacity style={styles.button} onPress={onRemove}>
                <Icon name="delete" size={24} color="#FFF"/>
            </TouchableOpacity>
        </View>
    );
}
