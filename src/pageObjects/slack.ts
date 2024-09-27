import https from 'https';

class Slack {
  async getPrivateChannelMessages(channelID) {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
      },
      rejectUnauthorized: false,
    };
    return new Promise((resolve, reject) => {
      const request = https.request(
        `https://slack.com/api/conversations.history?channel=${channelID}&limit=1`,
        options,
        (response) => {
          let data = '';
          response.on('data', (chunk) => {
            data += chunk;
          });

          response.on('end', () => {
            const result = JSON.parse(data);
            if (result.ok) {
              const messages = result.messages.map((message) => {
                const files = message.files || [];
                const fileSubjects = files.map((file) => file.title);
                return { fileSubjects };
              });
              resolve(messages);
            } else {
              reject(new Error(`Error: ${result.error}`));
            }
          });
        },
      );

      request.on('error', (error) => {
        reject(error);
      });

      request.end();
    });
  }

  async readSlack() {
    try {
      const messages = await this.getPrivateChannelMessages(process.env.PRIVATE_CHANNEL_ID);
      const combinedString = messages.flatMap((message) => message.fileSubjects).join(' ');
      return combinedString;
    } catch (error) {
      console.error(error.message);
      return '';
    }
  }
}

export default new Slack();
