const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/download/ytmp3', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.status(400).json({ error: 'No URL provided' });

  try {
    const info = await ytdl.getInfo(videoUrl);
    const format = ytdl.filterFormats(info.formats, 'audioonly')[0];

    res.json({
      status: true,
      result: {
        title: info.videoDetails.title,
        views: info.videoDetails.viewCount,
        likes: info.videoDetails.likes || 'N/A',
        ago: info.videoDetails.publishDate,
        timestump: info.videoDetails.lengthSeconds + ' seconds',
        downloadUrl: format.url
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to process video' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Moses-XD API running on port ${PORT}`));
