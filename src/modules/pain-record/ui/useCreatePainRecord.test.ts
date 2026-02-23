import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCreatePainRecord } from './useCreatePainRecord';
import type { CreatePainRecordRequest } from '../application/CreatePainRecordService';

describe('useCreatePainRecord Hook', () => {
    it('should execute the service and update isPending', async () => {
        const mockService = {
            execute: vi.fn().mockResolvedValue({ id: '123' })
        };
        
        const { result } = renderHook(() => useCreatePainRecord(mockService as any));

        expect(result.current.isPending).toBe(false);

        const request: CreatePainRecordRequest = { 
            intensity: 5, 
            slot: 'MORNING', 
            date: new Date('2026-02-23T10:00:00Z') 
        };
        
        act(() => {
            result.current.saveRecord(request);
        });

        await waitFor(() => {
            expect(mockService.execute).toHaveBeenCalledWith(request);
            expect(result.current.isPending).toBe(false);
            expect(result.current.error).toBeNull();
        });
    });

    it('should execute onSuccess callback when finished successfully', async () => {
        const mockService = { execute: vi.fn().mockResolvedValue({}) };
        const onSuccessSpy = vi.fn();

        const { result } = renderHook(() => useCreatePainRecord(mockService, { onSuccess: onSuccessSpy }));

        const request: CreatePainRecordRequest = { intensity: 5, slot: 'MORNING', date: new Date() };
        
        act(() => {
            result.current.saveRecord(request);
        });

        await waitFor(() => {
            expect(onSuccessSpy).toHaveBeenCalledTimes(1);
        });
    });
});
