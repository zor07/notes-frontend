import React, {useEffect} from 'react';
import {Card, Col, Divider, Form, Input, Row, Space, Tag, Typography, Button, Alert, Modal} from 'antd';
import {useNavigate, useLocation} from 'react-router-dom';
import {useTheme, DarkPalette} from '../../contexts/ThemeContext';

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
];

const ThemeLab: React.FC = () => {
    const {theme, darkPalette, updateDarkPalette, resetDarkPalette} = useTheme();
    const [form] = Form.useForm();
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
