import { useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity} from "react-native";
import { ExpenseProps } from "../Expense/Expense";
import { Picker } from "@react-native-picker/picker";
import { stylesExpenseFormModal } from "./styleExpenseFormModal";

type ExpenseFormModalProps = {
    visible: boolean;
    expense: ExpenseProps | null;
    categories: { id: number; name: string }[];
    onSave: (expense: Partial<ExpenseProps>) => void;
    onClose: () => void;
};

export function ExpenseFormModal({
                                     visible,
                                     expense,
                                     categories,
                                     onSave,
                                     onClose,
                                 }: ExpenseFormModalProps) {
    const [value, setValue] = useState<string>(expense?.value.toString() || "");
    const [category, setCategory] = useState<string>(expense?.category || "");
    const [dateTime, setDateTime] = useState<string>(expense?.dateTime || new Date().toISOString());

    useEffect(() => {
        if (expense) {
            setValue(expense.value.toString());
            setCategory(expense.category);
            setDateTime(expense.dateTime);
        }
    }, [expense]);

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesExpenseFormModal.container}>
                <Text style={stylesExpenseFormModal.title}>{expense ? "Editar Gasto" : "Novo Gasto"}</Text>

                <TextInput
                    style={stylesExpenseFormModal.input}
                    placeholder="Valor"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={setValue}
                />

                <Picker
                    selectedValue={category}
                    style={stylesExpenseFormModal.input}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                >
                    {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                    ))}
                </Picker>

                <TouchableOpacity
                    style={stylesExpenseFormModal.saveButton}
                    onPress={() => onSave({ value: parseFloat(value), category, dateTime })}
                >
                    <Text style={stylesExpenseFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={stylesExpenseFormModal.cancelButton} onPress={onClose}>
                    <Text style={stylesExpenseFormModal.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
