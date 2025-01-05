import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TaskProps } from "./index";
import { stylesTaskFormModal } from "./syleTaskFormModal";

type TaskFormModalProps = {
    visible: boolean;
    task: TaskProps | null;
    onSave: (task: Partial<TaskProps>) => void;
    onClose: () => void;
};

export function TaskFormModal({ visible, task, onSave, onClose }: TaskFormModalProps) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [hasAlarm, setHasAlarm] = useState(task?.hasAlarm || false);
    const [alarmTime, setAlarmTime] = useState<string | undefined>(task?.alarmTime);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    useEffect(() => {
        setTitle(task?.title || "");
        setDescription(task?.description || "");
        setHasAlarm(task?.hasAlarm || false);
        setAlarmTime(task?.alarmTime || undefined);
    }, [task]);

    const handleDateChange = (event: any, date?: Date) => {
        setShowDatePicker(false);
        if (date) {
            const currentDate = new Date(alarmTime || new Date());
            currentDate.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
            setAlarmTime(currentDate.toISOString());
        }
    };

    const handleTimeChange = (event: any, time?: Date) => {
        setShowTimePicker(false);
        if (time) {
            const currentDate = new Date(alarmTime || new Date());
            currentDate.setHours(time.getHours(), time.getMinutes());
            setAlarmTime(currentDate.toISOString());
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={stylesTaskFormModal.container}>
                <Text style={stylesTaskFormModal.title}>
                    {task ? "Editar Tarefa" : "Nova Tarefa"}
                </Text>
                <TextInput
                    style={stylesTaskFormModal.input}
                    placeholder="Título"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={stylesTaskFormModal.input}
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                />
                <View style={stylesTaskFormModal.switchContainer}>
                    <Text style={{ color: "#FFF" }}>Ativar Alarme?</Text>
                    <Switch
                        value={hasAlarm}
                        onValueChange={(value) => {
                            setHasAlarm(value);
                            if (!value) setAlarmTime(undefined);
                        }}
                    />
                </View>
                {hasAlarm && (
                    <>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={stylesTaskFormModal.timePickerButton}
                        >
                            <Text style={{ color: "#FFF" }}>
                                {alarmTime
                                    ? `Data: ${new Date(alarmTime).toLocaleDateString()}`
                                    : "Definir Data"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            style={stylesTaskFormModal.timePickerButton}
                        >
                            <Text style={{ color: "#FFF" }}>
                                {alarmTime
                                    ? `Hora: ${new Date(alarmTime).toLocaleTimeString()}`
                                    : "Definir Hora"}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
                {showDatePicker && (
                    <DateTimePicker
                        value={alarmTime ? new Date(alarmTime) : new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                {showTimePicker && (
                    <DateTimePicker
                        value={alarmTime ? new Date(alarmTime) : new Date()}
                        mode="time"
                        is24Hour={true}
                        display="default"
                        onChange={handleTimeChange}
                    />
                )}
                <TouchableOpacity
                    style={stylesTaskFormModal.saveButton}
                    onPress={() => onSave({ title, description, hasAlarm, alarmTime })}
                >
                    <Text style={stylesTaskFormModal.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={stylesTaskFormModal.cancelButton}
                    onPress={onClose}
                >
                    <Text style={stylesTaskFormModal.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}
