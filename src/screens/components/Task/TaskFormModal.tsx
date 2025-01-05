import React, {useState} from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {TaskProps} from "./index";
import {stylesTaskFormModal} from "./syleTaskFormModal";

type TaskFormModalProps = {
    visible: boolean;
    task: TaskProps | null;
    onSave: (task: Partial<TaskProps>) => void;
    onClose: () => void;
};

export function TaskFormModal({visible, task, onSave, onClose}: TaskFormModalProps) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [hasAlarm, setHasAlarm] = useState(task?.hasAlarm || false);
    const [alarmTime, setAlarmTime] = useState<string | undefined>(task?.alarmTime);
    const [showTimePicker, setShowTimePicker] = useState(false);

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
                    <Text style={{color: "#FFF"}}>Ativar Alarme?</Text>
                    <Switch
                        value={hasAlarm}
                        onValueChange={(value) => {
                            setHasAlarm(value);
                            if (!value) setAlarmTime(undefined);
                        }}
                    />
                </View>
                {hasAlarm && (
                    <TouchableOpacity
                        onPress={() => setShowTimePicker(true)}
                        style={stylesTaskFormModal.timePickerButton}
                    >
                        <Text style={{color: "#FFF"}}>
                            {alarmTime
                                ? `Alarme: ${new Date(alarmTime).toLocaleString()}`
                                : "Definir Alarme"}
                        </Text>
                    </TouchableOpacity>
                )}
                {showTimePicker && (
                    <DateTimePicker
                        value={alarmTime ? new Date(alarmTime) : new Date()}
                        mode="time"
                        display="default"
                        onChange={(event, date) => {
                            setShowTimePicker(false);
                            if (date) setAlarmTime(date.toISOString());
                        }}
                    />
                )}
                <TouchableOpacity
                    style={stylesTaskFormModal.saveButton}
                    onPress={() => onSave({title, description, hasAlarm, alarmTime})}
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
