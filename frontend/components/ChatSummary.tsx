import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '../utils/store';
import { generateConversation, extractImportantPoints } from '../utils/summary';

function ChatSummary({ route }) {
    const messageList = useStore(state => state.messagesList);
    const getSummary = useStore(state => state.getSummary);
    const recipient = route.params.recipient;
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState('');
    const [importantPoints, setImportantPoints] = useState([]);

    useEffect(() => {
        setLoading(true);
        async function fetchSummary() {
            const conversation = generateConversation(messageList, recipient);
            const generatedSummary = await getSummary(conversation);
            setSummary(generatedSummary);
            const points = extractImportantPoints(messageList, recipient);
            setImportantPoints(points);
            setLoading(false);
        }
        fetchSummary();
    }, [messageList, recipient, getSummary]);

    const renderMessagePart = (part, index) => (
      <Text key={index} style={part.isFile ? styles.fileHighlight : undefined}>
        {part.text}
      </Text>
    );

    const renderTableRow = (point, index) => (
      <View key={index} style={styles.tableRow}>
        <Text style={styles.tableCell}>
          {point.prefix}
          {point.parts.map(renderMessagePart)}
        </Text>
      </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator animating={loading} size="large" color="#000" />
            {!loading && (
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryHeaderText}>Conversation Summary:</Text>
                        <Text style={styles.summaryText}>{summary}</Text>
                        <View style={styles.table}>
                            <Text style={styles.tableHeader}>Important Messages</Text>
                            {importantPoints.map(renderTableRow)}
                        </View>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 10,
    },
    summaryCard: {
        borderRadius: 8,
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    summaryHeaderText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    summaryText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    table: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    tableHeader: {
        fontWeight: 'bold',
        backgroundColor: '#f7f7f7',
        textAlign: 'center',
        padding: 8,
        fontSize: 16,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        padding: 8,
    },
    tableCell: {
        fontSize: 16,
    },
    fileHighlight: {
        color: 'blue',
      },
});

export default ChatSummary;
