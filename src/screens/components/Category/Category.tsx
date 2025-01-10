import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesCategory } from "./styleCategory";

export type CategoryProps = {
    id: number;
    name: string;
    onEdit: () => void;
    onRemove: () => void;
};

export function Category({ id, name, onEdit, onRemove }: CategoryProps) {
    return (
        <View style={stylesCategory.container}>
            <Text style={stylesCategory.name}>{name}</Text>
            <View style={stylesCategory.actions}>
                <TouchableOpacity style={stylesCategory.editButton} onPress={onEdit}>
                    <Icon name="edit" size={20} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={stylesCategory.deleteButton} onPress={onRemove}>
                    <Icon name="delete" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}