import React, { FC, useCallback, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import * as Haptics from 'expo-haptics';

import { WatchlistItem } from './WhatchlistItem';
// import * as watchlistActions from '../store/actions/watchlist';
import Coin from '../models/Coin';
import { Colors } from '../constants';
import { WatchlistState } from '../store/watchlist/reducer';

interface TopMoversProps {
  coinData?: Coin[];
}

interface RootState {
  watchlist: WatchlistState;
}
export const Whatchlist: FC<TopMoversProps> = () => {
  const watchlistData = useSelector(
    (state: RootState) => state.watchlist.watchlistData
  ) || []

  const dispatch = useDispatch();

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Coin>) => {
      return (
        <WatchlistItem
          id={item.id}
          name={item.name}
          symbol={item.symbol}
          price={item.price}
          percentChange={item.percentChange}
          drag={drag}
          isActive={isActive}
        />
      )
    }, [])

  return (
    <View>
      <Text style={styles.watchlistText}>Watchlist</Text>
      <View style={styles.watchlistContainer}>
        <DraggableFlatList
          data={watchlistData}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          onDragBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          onDragEnd={({ data }) => { }}
          renderItem={renderItem}

        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  watchlistText: {
    fontSize: 21,
    fontWeight: '600',
    marginTop: 64,
    marginBottom: 10
  },
  watchlistContainer: {
    width: "88%",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.border,
    backgroundColor: 'white'
  }
})

