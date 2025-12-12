import React, {useEffect, useState} from 'react';
import {Card, Col, Divider, Form, Input, Row, Space, Tag, Typography, Button, Alert, Modal, Select} from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme, DarkPalette, DEFAULT_DARK_PALETTE} from '../../contexts/ThemeContext';

import css from './ThemeLab.module.css';

const {Title, Paragraph, Text} = Typography;

const paletteFields: Array<{
    key: keyof DarkPalette;
    label: string;
    helper?: string;
    type?: 'color' | 'colorAlpha';
}> = [
    {key: 'background', label: 'Фон страницы', type: 'color'},
    {key: 'surface', label: 'Основные блоки', type: 'color'},
    {key: 'surfaceElevated', label: 'Ховер/всплывающие', type: 'color'},
    {key: 'border', label: 'Границы', type: 'color'},
    {key: 'textPrimary', label: 'Текст основной', helper: 'rgba допускается', type: 'colorAlpha'},
    {key: 'textMuted', label: 'Текст вторичный', helper: 'rgba допускается', type: 'colorAlpha'},
    {key: 'textDisabled', label: 'Текст неактивный', helper: 'rgba допускается', type: 'colorAlpha'},
    {key: 'accent', label: 'Акцент', type: 'color'},
    {key: 'accentContrast', label: 'Контраст на акценте', type: 'color'},
    {key: 'selection', label: 'Подсветка/hover', type: 'color'},
    {key: 'selectionStrong', label: 'Активное выделение', type: 'color'},
    {key: 'shadowStrong', label: 'Тень', helper: 'rgba/hex', type: 'colorAlpha'},
    {key: 'buttonPrimaryBg', label: 'Кнопка (фон)', type: 'color'},
    {key: 'buttonPrimaryText', label: 'Кнопка (текст)', type: 'color'},
    {key: 'editorText', label: 'Текст редактора', helper: 'rgba допускается', type: 'colorAlpha'},
    {key: 'navbarBg', label: 'Фон навбара', type: 'color'},
];

const ThemeLab: React.FC = () => {
    const {theme, darkPalette, updateDarkPalette, resetDarkPalette} = useTheme();
    const [form] = Form.useForm();
    const presetOptions: Array<{value: string; label: string; palette: DarkPalette}> = [
        {value: 'dark-default', label: 'Темная (базовая)', palette: DEFAULT_DARK_PALETTE},
        {
            value: 'dark-purple',
            label: 'Dark Purple',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#0f0c1b',
                surface: '#181326',
                surfaceElevated: '#211b33',
                border: '#3a3052',
                textPrimary: 'rgba(231, 222, 255, 0.9)',
                textMuted: 'rgba(199, 185, 238, 0.6)',
                textDisabled: 'rgba(199, 185, 238, 0.35)',
                accent: '#9b7bff',
                selection: '#2a2142',
                selectionStrong: '#1b1430',
                shadowStrong: 'rgba(0,0,0,0.4)',
                buttonPrimaryBg: '#9b7bff',
                buttonPrimaryText: '#0f0c1b',
                editorText: 'rgba(231, 222, 255, 0.9)',
                navbarBg: '#181326',
            },
        },
        {
            value: 'dark-blue',
            label: 'Calm Blue',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#0d1117',
                surface: '#111827',
                surfaceElevated: '#162133',
                border: '#24304a',
                textPrimary: 'rgba(222, 230, 246, 0.92)',
                textMuted: 'rgba(170, 192, 230, 0.6)',
                textDisabled: 'rgba(170, 192, 230, 0.35)',
                accent: '#5dade2',
                selection: '#1d2b3f',
                selectionStrong: '#132032',
                shadowStrong: 'rgba(0,0,0,0.35)',
                buttonPrimaryBg: '#5dade2',
                buttonPrimaryText: '#0d1117',
                editorText: 'rgba(222, 230, 246, 0.92)',
                navbarBg: '#111827',
            },
        },
        {
            value: 'dark-green',
            label: 'Forest Mist',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#0f1712',
                surface: '#16201a',
                surfaceElevated: '#1d2a21',
                border: '#2e4134',
                textPrimary: 'rgba(215, 231, 218, 0.9)',
                textMuted: 'rgba(176, 200, 182, 0.6)',
                textDisabled: 'rgba(176, 200, 182, 0.35)',
                accent: '#73c08c',
                selection: '#223228',
                selectionStrong: '#18271d',
                shadowStrong: 'rgba(0,0,0,0.35)',
                buttonPrimaryBg: '#73c08c',
                buttonPrimaryText: '#0f1712',
                editorText: 'rgba(215, 231, 218, 0.9)',
                navbarBg: '#16201a',
            },
        },
        {
            value: 'dark-red',
            label: 'Soft Red',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#1a1010',
                surface: '#211414',
                surfaceElevated: '#2b1b1b',
                border: '#3d2a2a',
                textPrimary: 'rgba(244, 214, 214, 0.9)',
                textMuted: 'rgba(209, 172, 172, 0.6)',
                textDisabled: 'rgba(209, 172, 172, 0.35)',
                accent: '#e07a7a',
                selection: '#312020',
                selectionStrong: '#251616',
                shadowStrong: 'rgba(0,0,0,0.4)',
                buttonPrimaryBg: '#e07a7a',
                buttonPrimaryText: '#1a1010',
                editorText: 'rgba(244, 214, 214, 0.9)',
                navbarBg: '#211414',
            },
        },
        {
            value: 'dark-teal',
            label: 'Teal Breeze',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#0c1111',
                surface: '#101919',
                surfaceElevated: '#152222',
                border: '#234040',
                textPrimary: 'rgba(209, 235, 235, 0.9)',
                textMuted: 'rgba(170, 210, 210, 0.6)',
                textDisabled: 'rgba(170, 210, 210, 0.35)',
                accent: '#5fc7c7',
                selection: '#1c2d2d',
                selectionStrong: '#122121',
                shadowStrong: 'rgba(0,0,0,0.35)',
                buttonPrimaryBg: '#5fc7c7',
                buttonPrimaryText: '#0c1111',
                editorText: 'rgba(209, 235, 235, 0.9)',
                navbarBg: '#101919',
            },
        },
        {
            value: 'dark-amber',
            label: 'Amber Glow',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#16110a',
                surface: '#1f180d',
                surfaceElevated: '#281f12',
                border: '#3a2b1a',
                textPrimary: 'rgba(245, 229, 204, 0.9)',
                textMuted: 'rgba(214, 185, 140, 0.6)',
                textDisabled: 'rgba(214, 185, 140, 0.35)',
                accent: '#f0b05a',
                selection: '#2d2013',
                selectionStrong: '#23170d',
                shadowStrong: 'rgba(0,0,0,0.4)',
                buttonPrimaryBg: '#f0b05a',
                buttonPrimaryText: '#16110a',
                editorText: 'rgba(245, 229, 204, 0.9)',
                navbarBg: '#1f180d',
            },
        },
        {
            value: 'dark-rose',
            label: 'Rose Smoke',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#181015',
                surface: '#20171d',
                surfaceElevated: '#2a1f25',
                border: '#3c2c35',
                textPrimary: 'rgba(243, 220, 227, 0.9)',
                textMuted: 'rgba(210, 180, 192, 0.6)',
                textDisabled: 'rgba(210, 180, 192, 0.35)',
                accent: '#d68fb0',
                selection: '#2f232a',
                selectionStrong: '#241a21',
                shadowStrong: 'rgba(0,0,0,0.35)',
                buttonPrimaryBg: '#d68fb0',
                buttonPrimaryText: '#181015',
                editorText: 'rgba(243, 220, 227, 0.9)',
                navbarBg: '#20171d',
            },
        },
        {
            value: 'dark-slate',
            label: 'Slate Calm',
            palette: {
                ...DEFAULT_DARK_PALETTE,
                background: '#0f1115',
                surface: '#141820',
                surfaceElevated: '#1b202b',
                border: '#2c3342',
                textPrimary: 'rgba(223, 229, 239, 0.9)',
                textMuted: 'rgba(187, 198, 215, 0.6)',
                textDisabled: 'rgba(187, 198, 215, 0.35)',
                accent: '#7aa2f7',
                selection: '#202839',
                selectionStrong: '#181f30',
                shadowStrong: 'rgba(0,0,0,0.35)',
                buttonPrimaryBg: '#7aa2f7',
                buttonPrimaryText: '#0f1115',
                editorText: 'rgba(223, 229, 239, 0.9)',
                navbarBg: '#141820',
            },
        },
    ];
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as {from?: string} | undefined)?.from;

    useEffect(() => {
        form.setFieldsValue(darkPalette);
    }, [darkPalette, form]);

    const renderPreview = (value: string) => (
        <span className={css.swatch} style={{background: value}} />
    );

    const parseRgba = (value: string) => {
        const match = value.match(/rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)(?:\\s*,\\s*([0-9.]+))?\\s*\\)/i);
        if (!match) return null;
        const [, r, g, b, a] = match;
        return {r: Number(r), g: Number(g), b: Number(b), a: a !== undefined ? Number(a) : 1};
    };

    const hexToRgba = (hex: string, alpha = 1) => {
        let normalized = hex.replace('#', '');
        if (normalized.length === 3) {
            normalized = normalized.split('').map(ch => ch + ch).join('');
        }
        const intVal = parseInt(normalized, 16);
        const r = (intVal >> 16) & 255;
        const g = (intVal >> 8) & 255;
        const b = intVal & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const rgbaToHex = (value: string) => {
        const parsed = parseRgba(value);
        if (!parsed) return '#000000';
        const toHex = (n: number) => n.toString(16).padStart(2, '0');
        return `#${toHex(parsed.r)}${toHex(parsed.g)}${toHex(parsed.b)}`;
    };

    const getPickerValue = (value: string) => {
        if (value.startsWith('#')) return value;
        const parsed = parseRgba(value);
        if (parsed) return rgbaToHex(value);
        return '#000000';
    };

    const handleChange = (key: keyof DarkPalette, value: string) => {
        updateDarkPalette({[key]: value});
    };

    const handleColorWithAlphaChange = (key: keyof DarkPalette, hexValue: string) => {
        const current = darkPalette[key];
        const parsed = parseRgba(current);
        const alpha = parsed ? parsed.a : 1;
        const rgba = hexToRgba(hexValue, alpha);
        updateDarkPalette({[key]: rgba});
    };

    const handlePresetChange = (value: string) => {
        const found = presetOptions.find(p => p.value === value);
        if (found) {
            updateDarkPalette(found.palette);
            form.setFieldsValue(found.palette);
        }
        setSelectedPreset(value);
    };

    const handleClose = () => {
        navigate(from || '/');
    };

    return (
        <Modal
            open
            title="Настройка темной темы"
            onCancel={handleClose}
            footer={<Button type="primary" onClick={handleClose}>Закрыть</Button>}
            width={1080}
            destroyOnClose
        >
            <div className={css.modalBody}>
                <Space direction="vertical" size={16} style={{width: '100%'}}>
                    <div className={css.header}>
                        <div>
                            <Title level={4} style={{marginBottom: 4}}>Палитра</Title>
                            <Paragraph type="secondary" style={{margin: 0}}>
                                Подберите цвета темной темы и сразу смотрите, как они применяются. Настройки сохраняются локально.
                            </Paragraph>
                        </div>
                        <Space>
                            <Button onClick={resetDarkPalette}>Сбросить по умолчанию</Button>
                        </Space>
                    </div>

                    {theme !== 'dark' && (
                        <Alert
                            type="info"
                            message="Включите темную тему переключателем в хедере, чтобы увидеть изменения."
                            showIcon
                    />
                )}

                <Card>
                    <div className={css.presets}>
                        <Space size={8} align="center">
                            <Text strong>Выбрать тему:</Text>
                            <Select
                                style={{minWidth: 200}}
                                options={presetOptions.map(p => ({value: p.value, label: p.label}))}
                                onChange={handlePresetChange}
                                placeholder="Выберите тему"
                                value={selectedPreset}
                            />
                        </Space>
                    </div>
                    <Divider orientation="left" plain>Цветовые параметры</Divider>
                    <Form form={form} layout="vertical">
                        <Row gutter={[16, 12]}>
                                {paletteFields.map(field => (
                                    <Col xs={24} md={12} lg={8} key={field.key}>
                                        <Form.Item label={<Space size={8}>{field.label}{renderPreview(darkPalette[field.key])}</Space>} name={field.key}>
                                            {field.type === 'colorAlpha' ? (
                                                <Space className={css.colorRow} size={8} align="center">
                                                    <Input
                                                        type="color"
                                                        value={getPickerValue(darkPalette[field.key])}
                                                        onChange={(e) => handleColorWithAlphaChange(field.key, e.target.value)}
                                                    />
                                                    <Input
                                                        value={darkPalette[field.key]}
                                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                                        suffix={<Tag color="default">{darkPalette[field.key]}</Tag>}
                                                    />
                                                </Space>
                                            ) : (
                                                <Input
                                                    type="color"
                                                    value={getPickerValue(darkPalette[field.key])}
                                                    onChange={(e) => handleChange(field.key, e.target.value)}
                                                />
                                            )}
                                        </Form.Item>
                                        {field.helper && <Text type="secondary" className={css.helper}>{field.helper}</Text>}
                                    </Col>
                                ))}
                            </Row>
                        </Form>
                    </Card>
                </Space>
            </div>
        </Modal>
    );
};

export default ThemeLab;
