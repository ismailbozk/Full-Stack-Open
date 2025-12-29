import React, { useEffect } from "react";
import { FlatList, Pressable, View } from "react-native";
import "whatwg-fetch";
import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { Repository } from "../../types/Repository";
import { useNavigate } from "react-router";
import VerticalSeperator from "../Common/VerticalSeperator";
import { RepositoryOrderBy, RepositoryOrderDirection } from "../../types/Repository";
import { Picker } from '@react-native-picker/picker';

enum RepositoryListOrderOptions {
    // eslint-disable-next-line no-unused-vars
    LASTEST = 'Lastest Repositories',
    // eslint-disable-next-line no-unused-vars
    HIGHEST_RATED = 'Highest Rated Repositories',
    // eslint-disable-next-line no-unused-vars
    LOWEST_RATED = 'Lowest Rated Repositories',
}
export interface RepositoryListProps {
    repositories: Repository[];
    selectedOrder: RepositoryListOrderOptions;
    // eslint-disable-next-line no-unused-vars
    setSelectedOrder: (order: RepositoryListOrderOptions) => void;
    // eslint-disable-next-line no-unused-vars
    onPress: (repositoryId: string) => void;
}

export const RepositoryListContainer = (props: RepositoryListProps) => {
    return (
        <View style={{ flexGrow: 1, flexShrink: 1, flexDirection: 'column' }}>

            <FlatList
                data={props.repositories}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Pressable onPress={() => props.onPress(item.id)}>
                        <RepositoryItem repository={item} />
                    </Pressable>
                )}
                ItemSeparatorComponent={VerticalSeperator}
                ListHeaderComponent=
                {
                    <Picker
                        selectedValue={props.selectedOrder}
                        onValueChange={(itemValue) => props.setSelectedOrder(itemValue as RepositoryListOrderOptions)}
                    >
                        {
                            Object.values(RepositoryListOrderOptions)
                                .map(option => (<Picker.Item key={option} label={option.toString()} value={option} />)
                                )
                        }
                    </Picker>
                }
            />
        </View>
    );
};

function RepositoryList(): React.ReactElement {

    const { repositories, refetch } = useRepositories({ orderBy: RepositoryOrderBy.CREATED_AT, direction: RepositoryOrderDirection.DESC });
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = React.useState<RepositoryListOrderOptions>(RepositoryListOrderOptions.LASTEST);

    useEffect(() => {
        const orderBy = selectedOrder === RepositoryListOrderOptions.LASTEST
            ? RepositoryOrderBy.CREATED_AT
            : RepositoryOrderBy.RATING_AVERAGE;

        const orderDirection = selectedOrder === RepositoryListOrderOptions.LOWEST_RATED
            ? RepositoryOrderDirection.ASC
            : RepositoryOrderDirection.DESC;

        refetch(
            {
                orderBy: orderBy,
                direction: orderDirection,
            }
        );
    }, [selectedOrder]);

    return <RepositoryListContainer
        repositories={repositories}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        onPress={(repositoryId) => navigate(`/repository/${repositoryId}`)}
    />;
}

export default RepositoryList;