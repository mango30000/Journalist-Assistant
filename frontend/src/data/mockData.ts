export interface Investigation {
  id: number;
  title: string;
  description: string;
  status: 'В работе' | 'Завершено' | 'Черновик';
  createdAt: string;
}

export interface Source {
  id: number;
  name: string;
  type: 'Инсайдер' | 'Документ' | 'СМИ' | 'Свидетель';
  trustLevel: number; 
  contact: string;
  notes: string;
  investigationId: number;
}

export interface Event {
  id: number;
  date: string;
  title: string;
  description: string;
  investigationId: number;
}

export interface Evidence {
  id: number;
  title: string;
  type: 'Доказательство' | 'Факт' | 'Вывод'; 
  description: string;
  investigationId: number;
}

export interface Connection {
  id: number;
  from: string;
  to: string;
  relation: string;
}

export const investigations: Investigation[] = [
  {
    id: 1,
    title: 'Коррупция в мэрии',
    description: 'Расследование незаконных городских закупок',
    status: 'В работе',
    createdAt: '01-09-2026',
  },
  {
    id: 2,
    title: 'Экологический скандал',
    description: 'Загрязнение реки промышленными отходами',
    status: 'В работе',
    createdAt: '15-09-2026',
  },
];

export const sources: Source[] = [
  {
    id: 1,
    name: 'Анонимный сотрудник мэрии',
    type: 'Инсайдер',
    trustLevel: 4,
    contact: 'telegram: @anon_source',
    notes: 'Проверен дважды, информация точная',
    investigationId: 1,
  },
  {
    id: 2,
    name: 'Документы из реестра',
    type: 'Документ',
    trustLevel: 5,
    contact: 'Госреестр',
    notes: 'Официальные документы',
    investigationId: 1,
  },
  {
    id: 3,
    name: 'Местный житель',
    type: 'Свидетель',
    trustLevel: 3,
    contact: 'email: witness@mail.ru',
    notes: 'Видел сброс отходов',
    investigationId: 2,
  },
];

export const events: Event[] = [
  {
    id: 1,
    date: '15-03-2026',
    title: 'Подписание контракта',
    description: 'Мэрия заключила договор с ООО "Строй"',
    investigationId: 1,
  },
  {
    id: 2,
    date: '01-04-2026',
    title: 'Первый платеж',
    description: 'Переведено 50 млн рублей',
    investigationId: 1,
  },
  {
    id: 3,
    date: '20-05-2026',
    title: 'Жалоба жителей',
    description: 'Поступила жалоба на загрязнение',
    investigationId: 2,
  },
];

export const evidence: Evidence[] = [
  {
    id: 1,
    title: 'Выписка из реестра подтверждает связь',
    type: 'Доказательство',
    description: 'Официальный документ из госреестра, подтверждающий финансовую связь между чиновником А и ООО "Строй"',
    investigationId: 1,
  },
  {
    id: 2,
    title: 'Свидетель видел сброс отходов',
    type: 'Факт',
    description: 'Местный житель зафиксировал сброс промышленных отходов в реку Z 20 мая 2026 года',
    investigationId: 2,
  },
  {
    id: 3,
    title: 'Паттерн незаконных закупок',
    type: 'Вывод',
    description: 'Анализ показывает систематическое нарушение процедур закупок в мэрии с 2024 года',
    investigationId: 1,
  },
];

export const connections: Connection[] = [
  { id: 1, from: 'Чиновник А', to: 'ООО "Строй"', relation: 'финансирует' },
  { id: 2, from: 'ООО "Строй"', to: 'Банк Х', relation: 'имеет счет' },
  { id: 3, from: 'Завод Y', to: 'Река Z', relation: 'загрязняет' },
];