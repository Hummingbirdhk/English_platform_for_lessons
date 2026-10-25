import { describe, expect, it } from 'vitest';
import {
  getStudentSchedule,
  parseScheduleDateTime,
} from '../../src/content/teacher/teacherSchedule';

describe('teacher schedule', () => {
  it('keeps workbook times and attendance for Zlata', () => {
    const schedule = getStudentSchedule('student-zlata');
    const october8 = schedule.find((entry) => entry.dateTime === '08.10.2026 19:00');
    const november4 = schedule.find((entry) => entry.dateTime === '04.11.2026 19:00');

    expect(october8?.attendance).toBe('Отмена');
    expect(november4?.attendance).toBeNull();
  });

  it('keeps workbook reschedule and payment notes for Artem', () => {
    const schedule = getStudentSchedule('student-artem');
    const october21 = schedule.find((entry) => entry.dateTime === '21.10.2026 18:30');
    const october29 = schedule.find((entry) => entry.dateTime === '29.10.2026 18:30');

    expect(october21?.reschedule).toBe('На субботу 24');
    expect(october29?.payment).toBe('Оплата за 8 занятий за ноябрь');
  });

  it('parses schedule dates consistently', () => {
    expect(parseScheduleDateTime('04.11.2026 19:00').toISOString()).toBe(
      '2026-11-04T19:00:00.000Z',
    );
  });
});
