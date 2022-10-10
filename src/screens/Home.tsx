import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Image, FlatList, View } from 'react-native';
import { Colors } from '../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CBButton, NewsList, TopMovers, Whatchlist } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import WatchListAction from '../store/watchlist/actions';
import TopMoversAction from '../store/topmovers/actions';
import NewsAction from '../store/news/actions';
import Coin from '../models/Coin';
import cmpData from '../data/CoinMarketCapData';
import { TopmoversState } from '../store/topmovers/reducer';
import { NewsState } from '../store/news/reducer';
import News from '../models/News';
type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface RootState {
  topmovers: TopmoversState;
  news: NewsState;
}
export const Home = ({ navigation }: Props) => {
  const [dataNews, setDataNews] = useState([] as News[]);
  const topMoversData = useSelector(
    (state: RootState) => state.topmovers.topMoversData
  ) || []
  const newsData = useSelector(
    (state: RootState) => state.news.newsData
  ) || []
  const dispatch = useDispatch();

  const loadData = async () => {
    const coins = ['BTC', 'ETH', 'XRP', 'DOGE', 'SHIB', 'MANA'];

    try {
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${coins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();

      const coinData: Coin[] = [];

      coins.forEach(coin => {
        const coinDetails = cryptoResponseData.RAW[coin].USD;
        const cmpDetails = cmpData.data.find(cmp => coinDetails.FROMSYMBOL === cmp.symbol);
        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'N/A';

        coinData.push(
          new Coin(
            coinID,
            coinName,
            coin,
            coinDetails.PRICE,
            coinDetails.CHANGEPCT24HOUR
          )
        );
      });

      dispatch(WatchListAction.save(coinData));
    } catch (error) {
      console.log(error);
    }
  }
  const fetchTopMoversData = async () => {
    try {
      const cbResponse = await fetch('https://api.pro.coinbase.com/products');
      const cbResponseData = await cbResponse.json();

      let availableCoins: string[] = [];

      interface CBRequiredData {
        quote_currency: string;
        base_currency: string;
      }

      const filteredData = cbResponseData.filter(
        (coin: CBRequiredData) => coin.quote_currency === 'USD'
      )

      filteredData.forEach((coin: CBRequiredData, key: Number) => {
        if (key < 200) {
          availableCoins.push(coin.base_currency);
        }
      })
      const cryptoResponse = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&relaxedValidation=true&fsyms=${availableCoins.join()}`
      );
      const cryptoResponseData = await cryptoResponse.json();
      let dataAsArray = Object.values(cryptoResponseData.RAW);

      dataAsArray.sort((a: any, b: any) =>
        Math.abs(a.USD.CHANGEPCT24HOUR) < Math.abs(b.USD.CHANGEPCT24HOUR) ? 1 : -1
      )

      const coinData: Coin[] = [];

      for (const data of dataAsArray) {
        const cryptoData: any = data;

        const cmpDetails = cmpData.data.find(
          (cmpCoin) => cryptoData.USD.FROMSYMBOL === cmpCoin.symbol
        );

        const coinID = cmpDetails?.id ?? 0;
        const coinName = cmpDetails?.name ?? 'N/A';


        coinData.push(
          new Coin(
            coinID,
            coinName,
            cryptoData.USD.FROMSYMBOL,
            cryptoData.USD.PRICE,
            cryptoData.USD.CHANGEPCT24HOUR,
          ))

        if (coinData.length === 6) {
          break;
        }
      }
      dispatch(TopMoversAction.save(coinData));
    } catch (error) {
      console.log(error);
    }
  }
  const fetchNewsData = async () => {

    try {
      // Fetch news from cryptocompare API
      const response = await fetch(
        'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
      );
      const responseData = await response.json();
      //console.log(responseData);

      // Get the five latest news articles
      let newsData: News[] = [];
      for (const news of responseData.Data) {
        const formattedDate = new Date(news.published_on * 1000)
          .toString()
          .split(' ')
          .splice(1, 2)
          .join(' ');

        newsData.push(
          new News(
            news.source_info.name,
            formattedDate,
            news.title,
            news.imageurl,
            news.url
          )
        );
        if (newsData.length === 20) {
          break;
        }
      }
      setDataNews(newsData)
      dispatch(NewsAction.save(newsData));

    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadData();
    fetchTopMoversData();
    fetchNewsData();
  }, []);

  const viewMoreHandler = () => {
    navigation.navigate('News');
  };

  const ListFooterComponent = (
    <>
      <View style={{ alignItems: 'center' }}>
        <Image
          style={styles.image}
          source={{ uri: 'https://i.imgur.com/9EEaSaS.png' }}
        />
        <Text style={styles.title}>Welcome to Coinbase!</Text>
        <Text style={styles.subTitle}>Make your first investment today</Text>
        <CBButton title="Get Started" />
        <Whatchlist />
        <TopMovers coinData={topMoversData} />
        {dataNews.length > 0 && <NewsList isHomeScreen={true} newsData={dataNews} viewMoreHandler={viewMoreHandler} />}
      </View>

    </>
  );
  const emptyData: any = [];

  const renderNullItem = () => null;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={emptyData}
        renderItem={renderNullItem}
        ListFooterComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
};

export const screenOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  containerb: {
    alignItems: 'center'
  },
  image: {
    height: 250,
    width: 150,
    marginTop: 40,
  },
  title: {
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: .5,
  },
  subTitle: {
    fontSize: 17,
    marginBottom: 24,
    color: Colors.subtitle,
  }
});
