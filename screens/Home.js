import React from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, FlatList} from 'react-native';

import {COLORS, FONTS, SIZES, icons, images} from '../constants';

const LineDivider = () => {
    return (
        <View style={{width: 1, paddingVertical: 18}}>
            <View style={{flex: 1, borderLeftColor: COLORS.lightGray, borderLeftWidth: 1}}></View>
        </View>
    );
};

const Home = () => {
    const profileData = {
        name: 'UserName',
        point: 200,
    };

    const [profile, setProfile] = React.useState(profileData);

    function renderHeader(profile) {
        return (
            <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center'}}>
                {/* Greetings */}
                <View style={{flex: 1}}>
                    <View style={{marginRight: SIZES.padding}}>
                        <Text style={{...FONTS.h3, color: COLORS.white}}>Good Morning</Text>
                        <Text style={{...FONTS.h2, color: COLORS.white}}>{profile.name}</Text>
                    </View>
                </View>
                {/* point */}
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        height: 40,
                        paddingLeft: 3,
                        paddingRight: SIZES.radius,
                        borderRadius: 20,
                    }}
                    onPress={() => {
                        console.log('Point');
                    }}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: 'rbga(0,0,0,0.5)',
                            }}>
                            <Image
                                source={icons.plus_icon}
                                resizeMode="contain"
                                style={{
                                    width: 20,
                                    height: 20,
                                }}
                            />
                        </View>
                        <Text style={{marginLeft: SIZES.base, color: COLORS.white, ...FONTS.body3}}>
                            {profile.point} point
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    function renderButtonSection() {
        return (
            <View style={{flex: 1, justifyContent: 'center', padding: SIZES.padding}}>
                <View
                    style={{
                        flexDirection: 'row',
                        height: 70,
                        backgroundColor: COLORS.secondary,
                        borderRadius: SIZES.radius,
                    }}>
                    {/* Clain */}
                    <TouchableOpacity style={{flex: 1}} onPress={() => console.log('Chain')}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={icons.claim_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            <Text style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}>Clain</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider */}
                    <LineDivider />

                    {/* Get ponit */}
                    <TouchableOpacity style={{flex: 1}} onPress={() => console.log('Get Point')}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={icons.point_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            <Text style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}>Get Point</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Divider  */}
                    <LineDivider />

                    {/* My card */}
                    <TouchableOpacity
                        style={{
                            flex: 1,
                        }}
                        onPress={() => console.log('My Cart')}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Image
                                source={icons.card_icon}
                                resizeMode="contain"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                            <Text style={{marginLeft: SIZES.base, ...FONTS.body3, color: COLORS.white}}>My Cart</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.black}}>
            {/* header section */}
            <View style={{flex: 1, height: 200}}>
                {renderHeader(profile)}
                {renderButtonSection()}
            </View>
        </SafeAreaView>
    );
};

export default Home;
