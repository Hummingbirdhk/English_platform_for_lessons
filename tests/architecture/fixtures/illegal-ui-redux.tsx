import { useSelector } from 'react-redux';
export function IllegalUiRedux() { return String(useSelector((state: unknown) => state)); }
