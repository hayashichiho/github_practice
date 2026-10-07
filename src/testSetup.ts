import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// VitestのグローバルAPIを使わない構成なので、テスト間のDOMを明示的に片付ける。
afterEach(cleanup);
