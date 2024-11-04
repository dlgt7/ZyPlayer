/*!
 * @module multi-player
 * @brief 多播放器集成方案
 * @author HiramWong <admin@catni.cn>
 * @update 2024-10-28
 * @version 0.1.4
 *
 * **ChangeLog说明**:
 * - 2024.5.12:
 *   - 初步实现方法集成[xgplayer|nplayer|dplayer|artplayer]
 * - 2024.5.13:
 *   - 除xgplayer外增加弹幕发送逻辑
 *   - 优化xgplayer兼容性-xgplayer-flv.js替代xgplayer-flv, xgplayer-hls.js替代xgplayer-hls
 * - 2024.5.14:
 *   - 优化公共流逻辑-先检测环境是否支持
 *   - 修复seek方法xgplayer进度跳转失败
 *   - 修复playerNext方法nplayer会退出全屏
 * - 2024.5.15:
 *   - 修复取消监听事件导致组件内监听事件失效-提取为公共方法[时间变动|弹幕发送]
 *   - 修复自定义dplayer的off传入func匹配错误
 * - 2024.5.16:
 *   - 扩展dplayer画中画功能、控制栏弹幕开关
 *   - 调整dplayer参数unlimited为false-解决阻塞主进程问题
 *   - 修复触发playerNext方法在触发playerBarrage方法切换失败-没有赋值dp.options.video.src导致地址一直不变
 * - 2024.5.25:
 *   - 动态异步加载依赖
 *   - 按播放器解耦
 * - 2024.6.1:
 *   - 修复playerNext方法nplayer类型为mp4不生效
 *   - 统一风格-nplayer音量进度条改为垂直|扩展画中画控制栏显示|live模式去进度条
 *   - 统一风格-live模式去除相关弹幕组件[减少内存]
 * - 2024.6.2:
 *   - 修复mpd无法播放问题-类型映射
 *   - 修复xgplayer初始化播放器失败-plugin赋值错误
 *   - 优化mpd播放-使用shaka库替代dash库[dash库经常卡死|反复请求同一分片]
 *   - 修复artplayer弹幕库5.1版本-参数对齐
 *   - 修复nplayer弹幕不滚动-BulletOption中type赋值错误
 *   - 修复dplayer弹幕控制不生效-弹幕开关控制逻辑误删
 * - 2024.6.3:
 *   - 支持mp3|m4a音频-使用MPEG-TS库
 * - 2024.6.4:
 *   - 修复西瓜播放器加载视频错误
 *   - 修复多次创建播放器扩展插件会重复添加-默认参数使用深拷贝
 * - 2024.6.29:
 *   - 修复在live模式下切换下一个报错-需判断弹幕组件库是否加载
 *   - 修复flv数据流切换失败, 始终播放一个视频流
 *   - 统一调用公共逻辑摧毁实例(除西瓜播放器外)
 *   - 去除nplayer控制条调用画中画(遗留多次创建会创建多个dom问题bug)
 * - 2024.6.30:
 *   - 优化记忆音量和倍速(遗留art播放器UI显示不对bug-已提issue)-存储localStorage
 *   - 统一倍速为[0.5, 0.75, 1, 1.25, 1.5, 2]
 * - 2024.7.1:
 *   - 扩展dplayer播放器缺失once方法
 *   - 重写dplayer播放器destroy方法-始终会释放playrate为1的信号
 * - 2024.10.28:
 *   - 重写所有适配器-改为class适配器
 *   - 共享记忆数据,并初始化设置(注意:dplayer设置静音项图标不对应, artplayer设置倍速值不生效)-实际均生效
 *
 * ---
 */
