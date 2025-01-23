import { Client } from '@stomp/stompjs'

export class WebSocketClient {
	private client: Client;
	constructor(private endpoint: string) {
		// 使用传入的 WebSocket 端点创建连接
		this.client = new Client({
			brokerURL: endpoint, // 如果使用原生 WebSocket，则提供 ws:// 或 wss:// URL
			// 使用 SockJS
			webSocketFactory: () => new WebSocket(endpoint), // 如果需要 SockJS
			reconnectDelay: 5000, // 自动重连间隔
			debug: (str) => console.log(str), // 调试信息输出
		});
	}

	// 连接到 WebSocket 服务
	connect(onConnected: () => void, onError: (error: any) => void) {
		this.client.onConnect = () => {
			console.log('WebSocket connected');
			onConnected();
		};
		this.client.onStompError = (frame) => {
			console.error('Broker reported error:', frame);
			onError(frame);
		};
		this.client.activate(); // 激活客户端
	}

	// 订阅指定地址
	subscribe(destination: string, onMessage: (message: any) => void) {
		this.client.subscribe(destination, (message) => {
			const body = JSON.parse(message.body);
			onMessage(body);
		});
		console.log(`Subscribed to ${destination}`);
	}

	// 断开连接
	disconnect() {
		if (this.client.active) {
			this.client
				.deactivate()
				.then(() => {
					console.log('WebSocket disconnected');
				})
				.catch((error) => {
					console.error('Error during WebSocket disconnect:', error);
				});
		}
	}
}
