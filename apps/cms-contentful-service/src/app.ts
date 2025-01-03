import express from 'express';
import content from './routes/content';
import template from './routes/template';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/content', content);
app.use('/template', template);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
