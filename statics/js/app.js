$(document).ready(function(){
    var fnFormatMonth = function (x) {
        var month = x.getMonth() + 1;
        if(month < 10){
            month = '0' + month;
        }
        return  month + '/' + x.getFullYear();
    };
    var fnFormatByte = function (numBytes, precision) {
        var kilobyte = 1024;
        var megabyte = kilobyte * 1024;
        var gigabyte = megabyte * 1024;
        var terabyte = gigabyte * 1024;

        if ((numBytes >= 0) && (numBytes < kilobyte)) {
            return numBytes + ' B';
        } else if ((numBytes >= kilobyte) && (numBytes < megabyte)) {
            return (numBytes / kilobyte).toFixed(precision) + ' KB';
        } else if ((numBytes >= megabyte) && (numBytes < gigabyte)) {
            return (numBytes / megabyte).toFixed(precision) + ' MB';
        } else if ((numBytes >= gigabyte) && (numBytes < terabyte)) {
            return (numBytes / gigabyte).toFixed(precision) + ' GB';
        } else if (numBytes >= terabyte) {
            return (numBytes / terabyte).toFixed(precision) + ' TB';
        } else {
            return numBytes + ' B';
        }
    };

    var chartNumApps = c3.generate({
        bindto: '#chartNumApps',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            }
        },
        data: {
            x : 'x',
            columns: [],
            names: {
                data1: 'Total',
                data2: 'Type : hosted',
                data3: 'Type : packaged',
                data4: 'Type : privileged'
            },
            types: {
                data1: 'area-spline',
                data2: 'area-spline',
                data3: 'area-spline',
                data4: 'area-spline'
            }
        }
    });
    var chartNumAppsPlatform = c3.generate({
        bindto: '#chartNumAppsPlatform',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            }
        },
        data: {
            x : 'x',
            columns: [],
            names: {
                data1: 'desktop',
                data2: 'android-tablet',
                data3: 'android-mobile',
                data4: 'firefoxos'
            },
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });
    var chartNumAppsCategories = c3.generate({
        bindto: '#chartNumAppsCategories',
        axis : {
            x : {
                type : 'category'
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            columns: [],
            names: {
                data1: 'Number of apps per category'
            },
            type: 'bar'
        },
        legend: {
            show: false
        }
    });
    var chartNumAppsStatus = c3.generate({
        bindto: '#chartNumAppsStatus',
        axis : {
            x : {
                type : 'category'
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            columns: [],
            names: {
                data1: 'Number of apps per status'
            },
            type: 'bar'
        },
        legend: {
            show: false
        }
    });
    var chartNumAppsPremiumType = c3.generate({
        bindto: '#chartNumAppsPremiumType',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            },
            y: {
                max: 100,
                min: 0,
                padding: {
                    top: 0,
                    bottom: 0
                }
            },
            y2: {
                min: 0,
                padding: {
                    bottom: 0
                },
                show: true
            }
        },
        data: {
            x : 'x',
            axes: {
                data1: 'y',
                data2: 'y',
                data3: 'y',
                data4: 'y',
                data5: 'y',
                data6: 'y2'
            },
            columns: [],
            groups: [
                ['data1', 'data2', 'data3', 'data4', 'data5']
            ],
            names: {
                data1: 'free',
                data2: 'premium',
                data3: 'free-inapp',
                data4: 'other',
                data5: 'premium-inapp',
                data6: 'App with upsell'
            },
            type: 'bar',
            types: {
                data6: 'area-spline'
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });
    var chartNumAppsDateCreated = c3.generate({
        bindto: '#chartNumAppsDateCreated',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            x : 'x',
            columns: [],
            names: {
                data1: 'Created Date'
            }
        }
    });
    var chartNumAppsDateUpdated = c3.generate({
        bindto: '#chartNumAppsDateUpdated',
        axis : {
            x : {
                type : 'category'
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            columns: [],
            names: {
                data1: 'Number of apps per category'
            },
            type: 'bar'
        },
        legend: {
            show: false
        }
    });
    var chartNumAppsStatusDisabled = c3.generate({
        bindto: '#chartNumAppsStatusDisabled',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            x : 'x',
            columns: [],
            names: {
                data1: 'Enabled',
                data2: 'Disabled'
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });
    var chartNumAppsStatusPackaged = c3.generate({
        bindto: '#chartNumAppsStatusPackaged',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            x : 'x',
            columns: [],
            names: {
                data1: 'Packaged : No',
                data2: 'Packaged : Yes'
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });
    var chartNumAppsPublicStats = c3.generate({
        bindto: '#chartNumAppsPublicStats',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            }
        },
        data: {
            x : 'x',
            columns: [],
            names: {
                data1: 'Public Stats : No',
                data2: 'Public Stats : Yes'
            }
        },
        bar: {
            width: {
                ratio: 0.5
            }
        }
    });
    var chartNumRatings = c3.generate({
        bindto: '#chartNumRatings',
        data: {
            columns: [],
            names: {
                data1: 'Vote 1',
                data2: 'Vote 2',
                data3: 'Vote 3',
                data4: 'Vote 4',
                data5: 'Vote 5'
            },
            type : 'donut'
        }
    });
    var chartAvgRatings = c3.generate({
        bindto: '#chartAvgRatings',
        axis : {
            x : {
                type : 'timeseries',
                tick: {
                    format: fnFormatMonth
                }
            },
            y: {
                max: 5,
                min: 0,
                padding: {
                    top: 0,
                    bottom: 0
                }
            },
            y2: {
                show: true,
                min: 0,
                padding: {
                    top: 0,
                    bottom: 0
                }
            }
        },
        data: {
            x:'x',
            axes: {
                data1: 'y',
                data2: 'y2'
            },
            columns: [],
            names: {
                data1: 'Note moyenne',
                data2: 'Nombre de votes total'
            }
        }
    });
    var chartNumPaidAppsPerPrice = c3.generate({
        bindto: '#chartNumPaidAppsPerPrice',
        axis : {
            x : {
                type : 'category'
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            columns: [],
            names: {
                data1: 'Number of paid apps'
            }
        }
    });
    var chartNumAppsFileSize = c3.generate({
        bindto: '#chartNumAppsFileSize',
        axis : {
            x : {
                type : 'category'
            },
            y: {
                min: 0,
                padding: {
                    bottom: 0
                }
            }
        },
        data: {
            columns: [],
            names: {
                data1: 'Number of apps per file size'
            }
        }
    });

    $.getJSON('statics/stats.json', function(data) {
        var dataNumApps = [['x', 'data1', 'data2', 'data3', 'data4']];
        var dataNumAppsPlatform = [['x', 'data1', 'data2', 'data3', 'data4']];
        var dataNumAppsPremiumType = [['x', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6']];
        var dataNumAppsStatusDisabled = [['x', 'data1', 'data2']];
        var dataNumAppsStatusPackaged = [['x', 'data1', 'data2']];
        var dataNumAppsPublicStats = [['x', 'data1', 'data2']];
        var dataAvgRatings = [['x', 'data1', 'data2']];
        $.each(data.numApps, function(key, value) {
            dataNumApps.push([key, value, data.typeApp.hosted[key], data.typeApp.packaged[key], data.typeApp.privileged[key]]);
            dataNumAppsPlatform.push([key, data.typeDevice['desktop'][key], data.typeDevice['android-tablet'][key], data.typeDevice['android-mobile'][key], data.typeDevice['firefoxos'][key]]);

            // dataNumAppsPremiumType
            var iTotal = data.typePremium['free'][key];
            iTotal += data.typePremium['free-inapp'][key];
            iTotal += data.typePremium['other'][key];
            iTotal += data.typePremium['premium'][key];
            iTotal += data.typePremium['premium-inapp'][key];
            dataNumAppsPremiumType.push([
                key,
                (data.typePremium['free'][key] * 100 / iTotal).toFixed(2),
                (data.typePremium['premium'][key] * 100 / iTotal).toFixed(2),
                (data.typePremium['free-inapp'][key] * 100 / iTotal).toFixed(2),
                (data.typePremium['other'][key] * 100 / iTotal).toFixed(2),
                (data.typePremium['premium-inapp'][key] * 100 / iTotal).toFixed(2),
                data.numAppsWithUpsell[key]
            ]);

            dataNumAppsStatusDisabled.push([key, data.stateDisabled[0][key], data.stateDisabled[1][key]]);
            dataNumAppsStatusPackaged.push([key, data.statePackaged[0][key], data.statePackaged[1][key]]);
            dataNumAppsPublicStats.push([key, data.statePublicStats[0][key], data.statePublicStats[1][key]]);
            dataAvgRatings.push([key, data.rating.average[key].toFixed(2), data.rating.num[key]]);
        });
        chartNumApps.load({
            rows:dataNumApps
        });
        chartNumApps.flush();
        chartNumAppsPlatform.load({
            rows:dataNumAppsPlatform
        });
        chartNumAppsPlatform.flush();
        chartNumAppsPremiumType.load({
            rows:dataNumAppsPremiumType
        });
        chartNumAppsPremiumType.flush();
        chartNumAppsStatusDisabled.load({
            rows:dataNumAppsStatusDisabled
        });
        chartNumAppsStatusDisabled.flush();
        chartNumAppsStatusPackaged.load({
            rows:dataNumAppsStatusPackaged
        });
        chartNumAppsStatusPackaged.flush();
        chartNumAppsPublicStats.load({
            rows:dataNumAppsPublicStats
        });
        chartNumAppsPublicStats.flush();
        chartAvgRatings.load({
            rows:dataAvgRatings
        });
        chartAvgRatings.flush();

        // chartNumAppsDateCreated
        var dataNumAppsDateCreated = [['x', 'data1']];
        $.each(data.lastMonth.createdDate, function(key, value) {
            dataNumAppsDateCreated.push([key, value]);
        });
        chartNumAppsDateCreated.load({
            rows:dataNumAppsDateCreated
        });

        // chartNumRatings
        var dataRatings = [
            ['data1', data.lastMonth.avgRating1],
            ['data2', data.lastMonth.avgRating2],
            ['data3', data.lastMonth.avgRating3],
            ['data4', data.lastMonth.avgRating4],
            ['data5', data.lastMonth.avgRating5]
        ];
        chartNumRatings.load({
            columns:dataRatings
        });

        // chartNumPaidAppsPerPrice
        var dataNumPaidAppsPerPrice = ['data1'];
        var catNumPaidAppsPerPrice = [];
        $.each(data.lastMonth.priceLocale, function(key, value) {
            catNumPaidAppsPerPrice.push(key);
            dataNumPaidAppsPerPrice.push(value);
        });
        chartNumPaidAppsPerPrice.load({
            categories: catNumPaidAppsPerPrice,
            columns: [dataNumPaidAppsPerPrice]
        });

        // chartNumAppsFileSize
        var dataNumAppsFileSize = ['data1'];
        var catNumAppsFileSize = [];
        var prevSize = 0;
        $.each(data.lastMonth.size, function(key, value) {
            catNumAppsFileSize.push(fnFormatByte(prevSize, 0) + ' > ' + fnFormatByte(key, 0));
            dataNumAppsFileSize.push(value);
            prevSize = key;
        });
        chartNumAppsFileSize.load({
            categories: catNumAppsFileSize,
            columns: [dataNumAppsFileSize]
        });

        // chartNumAppsCategories
        var dataNumAppsCategories = ['data1'];
        var catNumAppsCategories = [];
        var lastKeyCat;
        for(var k in data.categories) {
            lastKeyCat = k;
        }
        $.each(data.categories[lastKeyCat], function(key, value) {
            catNumAppsCategories.push(key);
            dataNumAppsCategories.push(value);
        });
        chartNumAppsCategories.load({
            categories: catNumAppsCategories,
            columns: [dataNumAppsCategories]
        });

        // chartNumAppsDateUpdated
        var dataNumAppsDateUpdated = ['data1'];
        var catNumAppsDateUpdated = [];
        $.each(data.lastMonth.updatedLast, function(key, value) {
            if(key > 1){
                catNumAppsDateUpdated.push('> ' + key + ' months');
            } else {
                if(key == 0) {
                    catNumAppsDateUpdated.push('Last month');
                } else {
                    catNumAppsDateUpdated.push('> ' + key + ' month');
                }
            }
            dataNumAppsDateUpdated.push(value);
        });
        chartNumAppsDateUpdated.load({
            categories: catNumAppsDateUpdated,
            columns: [dataNumAppsDateUpdated]
        });

        // chartNumAppsStatus
        //@link : https://github.com/mozilla/zamboni/blob/master/mkt/constants/base.py#L4
        var arrayStatus = {
            0: 'Incomplete',
            2: 'Pending approval',
            4: 'Fully Reviewed',
            5: 'Disabled by Mozilla',
            11: 'Deleted',
            12: 'Rejected',
            13: 'Approved but waiting',
            15: 'Blocked',
            16: 'Unlisted'
        };
        var dataNumAppsStatus = ['data1'];
        var catNumAppsStatus = [];
        $.each(data.lastMonth.status, function(key, value) {
            catNumAppsStatus.push(arrayStatus[key]);
            dataNumAppsStatus.push(value);
        });
        chartNumAppsStatus.load({
            categories: catNumAppsStatus,
            columns: [dataNumAppsStatus]
        });

        // mapRepartition
        var mapRepartition = $('#mapRepartition').vectorMap({
            map: 'world_mill_en',
            zoomButtons : false,
            zoomOnScroll: false,
            series: {
                regions: [{
                    values:data.lastMonth.geo,
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(event, label, code){
                label.html(
                    '<b>'+label.html()+'</b></br>'+'<b>Num apps : </b>'+(data.lastMonth.geo[code] == undefined ? 0 : data.lastMonth.geo[code])
                );
            }
        });

        // topPublishers
        $('#topPublishers tbody').empty();
        for (var prop in data.lastMonth.topPublishers) {
            $('#topPublishers tbody').prepend('<tr><td><a href="https://marketplace.firefox.com/search?author='+data.lastMonth.topPublishers[prop]+'">'+data.lastMonth.topPublishers[prop]+'</a></td><td>'+prop+'</td></tr>');
        }
        // topRatings
        $('#topRatedApps tbody').empty();
        for (var prop in data.lastMonth.topRated) {
            $('#topRatedApps tbody').prepend('<tr><td>'+data.lastMonth.topRated[prop]+'</td><td>'+prop+'</td></tr>');
        }
    });
});
