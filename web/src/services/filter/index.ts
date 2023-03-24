import { FilterProps } from 'types'

export const fetchFilterParams = (filterId: string): FilterProps => {
  switch (filterId) {
    case 'organizations':
      return [
        {
          id: 'title',
          label: 'Название организации',
          type: 'text'
        },
        {
          id: 'field_org_status',
          label: 'Статус организации',
          type: 'multi-select',
          options: [
            { id: 76, lable: 'Действующая' },
            { id: 77, lable: 'Ликвидируется' },
            { id: 78, lable: 'В состоянии банкротства' }
          ],
          dictionaryId: 'org_func_statuse'
        },
        {
          id: 'field_org_size',
          label: 'Размер организации',
          type: 'multi-select',
          options: [
            { id: 81, lable: 'Mикроорганизация' },
            { id: 82, lable: 'Mалая организация' },
            { id: 83, lable: 'Средняя организация' },
            { id: 84, lable: 'Крупная организация' }
          ],
          dictionaryId: 'org_size'
        },
        {
          id: 'field_org_startup',
          label: 'Стартап',
          type: 'switch',
        },
        {
          id: 'field_org_date',
          label: 'Дата регистрации',
          type: 'date',
        }
      ]
      break
    default:
      return []
  }
}
