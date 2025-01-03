import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#1F1E25',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },
    containerCompleted: {
        backgroundColor: '#333333',
    },
    checkboxContainer: {
        marginRight: 8,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#4EA8DE',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: '#5E60CE', // Cor para o checkbox quando marcado
        borderColor: '#5E60CE',
    },
    name: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
        marginLeft: 8,
    },
    nameCompleted: {
        textDecorationLine: 'line-through',
        color: '#6B6B6B',
    },
    button: {
        width: 32,
        height: 32,
        borderRadius: 5,
        backgroundColor: '#E23C44',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
