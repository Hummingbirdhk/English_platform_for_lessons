import { beforeEach, describe, expect, it, vi } from 'vitest';
import { findStudentById } from '../../src/content/loadContent';
import {
  readStudentWorkspace,
  saveStudentWorkspace,
  writeStudentWorkspace,
} from '../../src/features/student-workspace/studentWorkspace';
import { isCloudConfigured } from '../../src/shared/config/cloud';

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
    expect(storedArtem.focus.main).toBe('Past Simple');
  });

  it('keeps local persistence working when cloud is disabled in tests', () => {
    expect(isCloudConfigured).toBe(false);

    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const zlata = findStudentById('student-zlata');
    expect(zlata).toBeDefined();

    const workspace = readStudentWorkspace(zlata!);
    saveStudentWorkspace(
      zlata!,
      { ...workspace, currentHomework: 'Local-only homework' },
      ['currentHomework'],
    );

    expect(readStudentWorkspace(zlata!).currentHomework).toBe('Local-only homework');
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });
});
