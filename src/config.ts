import 'dotenv/config';
import {z} from 'zod';

const ConfigSchema = z.object({
  FIREBASE_USE_EMULATOR: z.string().transform(v => ['true', '1'].includes(v.toLowerCase())),
  FIREBASE_CREDENTIALS: z.string().optional(),
  FIREBASE_CREDENTIALS_PATH: z.string().optional()
});

export default (() => {
  try {
    return ConfigSchema.parse(process.env);
  } catch (e) {
    console.log(`🚫 Configuration loading has failed: ${e}`);
    process.exit(1);
  }
})();
