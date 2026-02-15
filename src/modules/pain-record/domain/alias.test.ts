import { describe, it, expect } from 'vitest'
import { SHARED_VALUE } from '@shared/domain/constants'

describe('Architecture Aliases', () => {
    it('should resolve @shared alias correctly', () => {
        expect(SHARED_VALUE).toBe(42)
    })
})
