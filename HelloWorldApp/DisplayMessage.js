// dump component file
import React from 'react';
import { View, Text } from 'react-native';

export default function DisplayMessage({ message }) {
    return (
        <View>
            <Text>Message: { message }</Text>
        </View>
    );
}