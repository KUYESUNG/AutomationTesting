import { Page, Locator, expect } from '@playwright/test';
import { gotoMainPage } from '../../utils/navigation';

export class SearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchResultLink: Locator;
    readonly aptDetailElement: Locator;

    constructor(page: Page) {
        this.page = page;
        // 검색 입력 필드
        this.searchInput = page.getByPlaceholder('아파트, 지역 또는 학교명으로 검색');

        // 검색 결과 링크 (동적으로 생성되므로 메서드에서 처리)
        this.searchResultLink = page.locator('a');

        // 성공 기준: 아파트 상세 정보 요소
        this.aptDetailElement = page.locator('.box-border > div:nth-child(3) > button');
    }

    async goto() {
        await gotoMainPage(this.page);
    }

    /**
     * 검색어 입력 및 검색 실행
     */
    async search(keyword: string) {
        await this.searchInput.fill(keyword);
    }

    /**
     * 검색 결과에서 특정 링크 클릭
     * @param resultText - 클릭할 검색 결과의 텍스트 (예: "반포동 반포자이")
     */
    async clickSearchResult(resultText: string) {
        // 검색 결과가 나타날 때까지 기다린 후 클릭
        const resultLink = this.page
            .locator('a')
            .filter({ hasText: new RegExp(`^${resultText}$`) });

        // 검색 결과가 나타날 때까지 대기
        await resultLink.waitFor({ state: 'visible' });
        // 실제 클릭 (다른 요소 인터셉트 방지 위해 force 사용)
        await resultLink.click({ force: true });
    }

    /**
     * 전체 검색 플로우를 한 번에 수행
     * @param keyword - 검색어 (예: "반포자이")
     * @param resultText - 클릭할 검색 결과 텍스트 (예: "반포동 반포자이")
     */
    async searchAndSelect(keyword: string, resultText: string) {
        await this.goto();
        await this.search(keyword);
        await this.clickSearchResult(resultText);
    }

    /**
     * 검색 성공 여부 검증
     * - 요구사항: `class=apt-detail` 요소가 화면에 노출되어야 함
     */
    async expectSearchSuccess() {
        await expect(this.aptDetailElement).toBeVisible();
    }

    /**
     * 검색 실패 여부 검증 (선택적)
     * - `apt-detail` 요소가 보이지 않으면 실패로 간주
     */
    async expectSearchFailure() {
        await expect(this.aptDetailElement).not.toBeVisible();
    }
}

