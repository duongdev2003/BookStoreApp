import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, Animated} from 'react-native';
import {FONTS, COLORS, SIZES, icons} from '../constants';

const BookDetail = ({route, navigation}) => {
    const LineDriver = () => {
        return (
            <View style={{width: 1, paddingVertical: 5}}>
                <View style={{flex: 1, borderLeftColor: COLORS.lightGray2, borderLeftWidth: 1}}></View>
            </View>
        );
    };

    const [book, setBook] = React.useState(null);

    const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
    const [scrollViewVisibleHeight, setScrollViewVisibleHeight] = React.useState(0);

    const indicator = new Animated.Value(0);

    React.useEffect(() => {
        let {book} = route.params;
        setBook(book);
    }, [book]);

    function renderBookInfoSection() {
        return (
            <View style={{flex: 1}}>
                <ImageBackground
                    source={book.bookCover}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    }}
                />
                {/* Color Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: book.backgroundColor,
                    }}></View>
                {/* Navigation Header */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        height: 80,
                        alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.base,
                        }}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={icons.back_arrow_icon}
                            resizeMode="contain"
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: book.navTintColor,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{...FONTS.h3, color: book.navTintColor}}>Book Detail</Text>
                    </View>
                    <TouchableOpacity style={{marginRight: SIZES.base}} onPress={() => console.log('Click More')}>
                        <Image
                            source={icons.more_icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: book.navTintColor,
                                alignItems: 'flex-end',
                            }}
                        />
                    </TouchableOpacity>
                </View>
                {/* Book Cover */}
                <View style={{flex: 5, paddingTop: SIZES.padding2, alignItems: 'center'}}>
                    <Image
                        source={book.bookCover}
                        resizeMode="contain"
                        style={{
                            flex: 1,
                            width: 150,
                            height: 'auto',
                        }}
                    />
                </View>
                {/* Book name anh Author */}
                <View style={{flex: 1.8, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{...FONTS.h2, color: book.navTintColor}}>{book.bookName}</Text>
                    <Text style={{...FONTS.body3, color: book.navTintColor}}>{book.author}</Text>
                </View>
                {/* Book info */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 20,
                        margin: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    }}>
                    {/* Rating */}
                    <View style={{flex: 1, alignItems: 'center', paddingHorizontal: SIZES.radius}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>{book.rating}</Text>
                        <Text style={{...FONTS.body4, color: COLORS.white}}>Rating</Text>
                    </View>

                    <LineDriver />

                    {/* Page */}
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>{book.pageNo}</Text>
                        <Text style={{...FONTS.body4, color: COLORS.white}}>Number of Pge</Text>
                    </View>

                    <LineDriver />

                    {/* Language */}
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>{book.language}</Text>
                        <Text style={{...FONTS.body4, color: COLORS.white}}>Language</Text>
                    </View>
                </View>
            </View>
        );
    }

    function renderDescription() {
        const indicatorSize =
            scrollViewWholeHeight > scrollViewVisibleHeight
                ? (scrollViewVisibleHeight * scrollViewVisibleHeight) / scrollViewWholeHeight
                : scrollViewVisibleHeight;

        const difference = scrollViewVisibleHeight > indicatorSize ? scrollViewVisibleHeight - indicatorSize : 1;

        return (
            <View style={{flex: 1, flexDirection: 'row', padding: SIZES.padding}}>
                {/* Custom scrollbar */}
                <View style={{width: 4, height: '100%', backgroundColor: COLORS.gray1}}>
                    <Animated.View
                        style={{
                            width: 4,
                            height: indicatorSize,
                            backgroundColor: COLORS.lightGray4,
                            transform: [
                                {
                                    translateY: Animated.multiply(
                                        indicator,
                                        scrollViewVisibleHeight / scrollViewWholeHeight,
                                    ).interpolate({
                                        inputRange: [0, difference],
                                        outputRange: [0, difference],
                                        extrapolate: 'clamp',
                                    }),
                                },
                            ],
                        }}
                    />
                </View>
                {/* Desc */}
                <ScrollView
                    contentContainerStyle={{paddingLeft: SIZES.padding2}}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onContentSizeChange={(width, height) => {
                        setScrollViewWholeHeight(height);
                    }}
                    onLayout={({
                        nativeEvent: {
                            layout: {x, y, width, height},
                        },
                    }) => {
                        setScrollViewVisibleHeight(height);
                    }}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: indicator}}}], {
                        useNativeDriver: false,
                    })}>
                    <Text style={{...FONTS.h2, color: COLORS.white, marginBottom: SIZES.padding}}>Description</Text>
                    <Text style={{...FONTS.body2, color: COLORS.lightGray}}>{book.description}</Text>
                </ScrollView>
            </View>
        );
    }

    if (book) {
        return (
            <View style={{flex: 1, backgroundColor: COLORS.black}}>
                {/* Book Cover Section */}
                <View style={{flex: 4}}>{renderBookInfoSection()}</View>

                {/* Desc */}
                <View style={{flex: 2}}>{renderDescription()}</View>

                {/* Buttons */}
                <View style={{height: 70}}></View>
            </View>
        );
    } else {
        return <></>;
    }
};

export default BookDetail;
