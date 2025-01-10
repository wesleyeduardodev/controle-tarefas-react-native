import { useState, useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import { Expense, ExpenseProps } from "../components/Expense/Expense";
import { Category, CategoryProps } from "../components/Category/Category";
import { ExpenseFormModal } from "../components/ExpenseFormModal/ExpenseFormModal";
import { CategoryFormModal } from "../components/CategoryFormModal/CategoryFormModal";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesHome } from "./styleHome";
import { api } from "../services/api";

export function Home() {
    const [expenses, setExpenses] = useState<ExpenseProps[]>([]);
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<ExpenseProps | null>(null);
    const [categoryToEdit, setCategoryToEdit] = useState<CategoryProps | null>(null);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const fetchExpenses = async () => {
        try {
            console.log("Carregandos gastos..")
            const response = await api.get("/expenses");
            setExpenses(response.data);
        } catch (error) {
            console.error("Não foi possível carregar gastos..")
            Alert.alert("Erro", "Não foi possível carregar os gastos.");
        }
    };

    const fetchCategories = async () => {
        try {
            console.log("Carregandos categorias..")
            const response = await api.get("/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Não foi possível carregar categorias..")
            Alert.alert("Erro", "Não foi possível carregar as categorias.");
        }
    };

    const handleAddExpense = async (newExpense: ExpenseProps) => {
        try {
            const response = await api.post("/expenses", newExpense);
            setExpenses((prev) => [...prev, response.data]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar o gasto.");
        }
    };

    const handleEditExpense = async (id: number, updatedExpense: Partial<ExpenseProps>) => {
        try {
            const existingExpense = expenses.find((expense) => expense.id === id);
            if (!existingExpense) return;

            const mergedExpense = { ...existingExpense, ...updatedExpense };
            await api.put(`/expense/${id}`, mergedExpense);

            setExpenses((prev) =>
                prev.map((expense) => (expense.id === id ? mergedExpense : expense))
            );
        } catch (error) {
            Alert.alert("Erro", "Não foi possível editar o gasto.");
        }
    };

    const handleRemoveExpense = async (id: number) => {
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== id));
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover o gasto.");
        }
    };

    const handleAddCategory = async (newCategory: CategoryProps) => {
        try {
            const response = await api.post("/categories", newCategory);
            setCategories((prev) => [...prev, response.data]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar a categoria.");
        }
    };

    const handleEditCategory = async (id: number, updatedCategory: Partial<CategoryProps>) => {
        try {
            const existingCategory = categories.find((category) => category.id === id);
            if (!existingCategory) return;

            const mergedCategory = { ...existingCategory, ...updatedCategory };
            await api.put(`/categories/${id}`, mergedCategory);

            setCategories((prev) =>
                prev.map((category) => (category.id === id ? mergedCategory : category))
            );
        } catch (error) {
            Alert.alert("Erro", "Não foi possível editar a categoria.");
        }
    };

    const handleRemoveCategory = async (id: number) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((category) => category.id !== id));
        } catch (error) {
            Alert.alert("Erro", "Não foi possível remover a categoria.");
        }
    };

    return (
        <View style={stylesHome.container}>
            <TouchableOpacity
                style={stylesHome.addButton}
                onPress={() => setIsExpenseModalVisible(true)}
            >
                <Icon name="add" size={28} color="#FFF" />
                <Text style={stylesHome.addButtonText}>Adicionar Gasto</Text>
            </TouchableOpacity>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Expense
                        {...item}
                        onEdit={() => {
                            setExpenseToEdit(item);
                            setIsExpenseModalVisible(true);
                        }}
                        onRemove={() => handleRemoveExpense(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>Nenhum gasto registrado.</Text>
                )}
            />

            <TouchableOpacity
                style={stylesHome.addButton}
                onPress={() => setIsCategoryModalVisible(true)}
            >
                <Icon name="category" size={28} color="#FFF" />
                <Text style={stylesHome.addButtonText}>Adicionar Categoria</Text>
            </TouchableOpacity>

            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Category
                        {...item}
                        onEdit={() => {
                            setCategoryToEdit(item);
                            setIsCategoryModalVisible(true);
                        }}
                        onRemove={() => handleRemoveCategory(item.id)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={stylesHome.listEmptyText}>Nenhuma categoria registrada.</Text>
                )}
            />

            {isExpenseModalVisible && (
                <ExpenseFormModal
                    visible={isExpenseModalVisible}
                    expense={expenseToEdit}
                    categories={categories}
                    onSave={(expense: Partial<ExpenseProps>) => {
                        if (expenseToEdit) {
                            handleEditExpense(expenseToEdit.id, expense);
                        } else {
                            handleAddExpense(expense as ExpenseProps);
                        }
                        setIsExpenseModalVisible(false);
                    }}
                    onClose={() => setIsExpenseModalVisible(false)}
                />
            )}


            {isCategoryModalVisible && (
                <CategoryFormModal
                    visible={isCategoryModalVisible}
                    category={categoryToEdit}
                    onSave={(category: Partial<CategoryProps>) => {
                        if (categoryToEdit) {
                            handleEditCategory(categoryToEdit.id, category);
                        } else {
                            handleAddCategory(category as CategoryProps);
                        }
                        setIsCategoryModalVisible(false);
                    }}
                    onClose={() => setIsCategoryModalVisible(false)}
                />
            )}

        </View>
    );
}
