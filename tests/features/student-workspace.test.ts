import { beforeEach, describe, expect, it } from 'vitest';
import { findStudentById } from '../../src/content/loadContent';
import {
  readStudentWorkspace,
  writeStudentWorkspace,
} from '../../src/features/student-workspace/studentWorkspace';

describe('student workspace', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts from the student content defaults', () => {
    const zlata = findStudentById('student-zlata');
    expect(zlata).toBeDefined();

    const workspace = readStudentWorkspace(zlata!);
    expect(workspace.profileTags).toContain('Present Simple');
    expect(workspace.focus.main).toBe('Present Simple');
    expect(workspace.assignedMaterialIds).toContain('grammar-present-simple');
  });

  it('stores custom profile and assignments separately per student', () => {
    const zlata = findStudentById('student-zlata');
    const artem = findStudentById('student-artem');
    expect(zlata).toBeDefined();
    expect(artem).toBeDefined();

    const zlataWorkspace = readStudentWorkspace(zlata!);
    writeStudentWorkspace(zlata!.id, {
      ...zlataWorkspace,
      profileTags: ['Past Simple', 'Module 3'],
      focus: {
        main: 'Past Simple',
        practice: 'Speaking',
        revision: 'Present Simple',
      },
      assignedMaterialIds: [...zlataWorkspace.assignedMaterialIds, 'grammar-past-continuous'],
    });

    const storedZlata = readStudentWorkspace(zlata!);
    const storedArtem = readStudentWorkspace(artem!);

    expect(storedZlata.profileTags).toEqual(['Past Simple', 'Module 3']);
    expect(storedZlata.focus.main).toBe('Past Simple');
    expect(storedZlata.assignedMaterialIds).toContain('grammar-past-continuous');
    expect(storedArtem.profileTags).not.toEqual(storedZlata.profileTags);
  });
});
