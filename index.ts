import { Application } from './my_framework/Application';
import { parseJson } from './my_framework/parseJson';
import { parseUrl } from './my_framework/parseUrl';
import userRouter from './routes/user-router';

const PORT = 8000;
const app = new Application();

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));

app.addRouter(userRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
