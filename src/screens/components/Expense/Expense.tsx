import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesExpense } from "./styleExpense";

export type ExpenseProps = {
    id: number;
    value: number;
    category: string;
    dateTime: string;
    onEdit: () => void;
    onRemove: () => void;
};

export function Expense({ id, value, category, dateTime, onEdit, onRemove }: ExpenseProps) {
    return (
        <View style={stylesExpense.container}>
            <View style={stylesExpense.info}>
                <Text style={stylesExpense.value}>R$ {value.toFixed(2)}</Text>
                <Text style={stylesExpense.category}>{category}</Text>
                <Text style={stylesExpense.dateTime}>{new Date(dateTime).toLocaleString()}</Text>
            </View>
            <View style={stylesExpense.actions}>
                <TouchableOpacity style={stylesExpense.editButton} onPress={onEdit}>
                    <Icon name="edit" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={stylesExpense.deleteButton} onPress={onRemove}>
                    <Icon name="delete" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
