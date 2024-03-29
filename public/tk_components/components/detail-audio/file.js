/**
 * Created by Max on 2017/6/22.
 */

// 自定义文件夹变量
var hndsDirectory = 'tkData';
// 自定义文件夹路径
var hndsDirectoryPath;
var myFs;

function makeReader(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function() {
        callback(this.result);
    }
    return reader;
}
//视频录制
function captureVideo(callback) {
    navigator.device.capture.captureVideo(function(d) {
        console.log(d)
        window.resolveLocalFileSystemURL(
            d[0].fullPath,
            function(entry) {
                console.log(entry)
                entry.file(function(file) {
                    makeReader(file, function(data) {
                        callback(data, d);
                    })
                })
            }
        )
    }, function(err) {
        console.log(err);
    }, {
        limit: 1,
        duration: 20,
        quality: 0
    });
}
// 在根目录下自定义文件夹

// name: 文件夹名称
// appRoot: 根目录变量
// appRootPath: 根目录路径

function createFile(name, callback) {
    // 录音开始
    var that = this;
    // 创建文件，若无此文件则创建
    myFs.getFile(name, {
        create: true,
        exclusive: false
    }, function(fileEntry) {
        var mediaRecord = new Media(fileEntry.nativeURL, function() {
            // 录音结束后，将文件路径保存，用于本地播放
            // 将文件转成base64，上传到线上
            myFs.getFile(name, {
                    create: true,
                    exclusive: false
                }, function(fileEntry) {
                    fileEntry.file(function(file) {
                        var reader = new FileReader();
                        createFile.reader = reader;
                        reader.readAsDataURL(file)
                        reader.onload = function() {
                            callback(this.result, fileEntry.nativeURL);
                        }
                    })
                }, function() {
                    // create root directory error!
                })
                // that.audioName.push(true)
        }, function(err) {
            console.log(err);
        });
        //开始录音之前创建一个时间点
        var startTime = new Date().getTime();
        mediaRecord.startRecord() // 录音
        createFile.stop = function() {
            createFile.timer = new Date().getTime() - startTime;
            mediaRecord.stopRecord();
            mediaRecord.release();
            createFile.recTime = 0
        }
        createFile.cancel = function() {
            createFile.reader.onload = function() {};
        }
    }, function() {
        // create root directory error!
    })
}

export {
    createFile,
    hndsDirectoryPath,
    hndsDirectory,
    captureVideo,
    myFs
}