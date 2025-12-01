import cron from 'cron';
import https from 'https';

// Cron job to ping heartbeat URL every 14 minutes so that render.com keeps the backend awake
const job = new cron.CronJob('*/14 * * * *', () => {
	const heartbeatUrl = process.env.HEARTBEAT_URL;
	if (!heartbeatUrl) {
		console.warn('HEARTBEAT_URL is not set; skipping heartbeat ping');
		return;
	}

	https.get(heartbeatUrl, (res) => {
		if (res.statusCode === 200) {
			console.log('Heartbeat successful');
		} else {
			console.log(`Heartbeat failed with status code: ${res.statusCode}`);
		}
	}).on('error', (e) => console.error(`Heartbeat error: ${e.message}`));
});

export default job;
