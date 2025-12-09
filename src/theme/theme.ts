export type ThemeMode = 'light' | 'dark';

const DARK_LINK_ID = 'antd-dark-theme';

const ensureDarkCss = async () => {
    if (document.getElementById(DARK_LINK_ID)) {
        return;
    }
    // В Ant Design 4.x нет файла antd.dark.css
    // Используем CSS переменные и собственные стили для темной темы
    const style = document.createElement('style');
    style.id = DARK_LINK_ID;
    style.textContent = `
        :root {
            --ant-primary-color: #1890ff;
            --ant-success-color: #52c41a;
            --ant-warning-color: #faad14;
            --ant-error-color: #f5222d;
        }
        body.theme-dark {
            background-color: #141414;
            color: rgba(255, 255, 255, 0.85);
        }
        body.theme-dark .ant-layout {
            background: #141414;
        }
        body.theme-dark .ant-layout-content {
            background: #141414;
        }
        body.theme-dark .site-layout-background {
            background: #1f1f1f;
        }
        body.theme-dark .app-wrapper-content {
            background-color: #1f1f1f;
        }
    `;
    document.head.appendChild(style);
    // Добавляем атрибут для темной темы
    document.documentElement.setAttribute('data-theme', 'dark');
};

const removeDarkCss = () => {
    const existing = document.getElementById(DARK_LINK_ID);
    if (existing) {
        existing.remove();
    }
    // Удаляем атрибут для темной темы
    document.documentElement.removeAttribute('data-theme');
};

export const applyTheme = async (mode: ThemeMode) => {
    if (mode === 'dark') {
        await ensureDarkCss();
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
    } else {
        removeDarkCss();
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
    }
};

