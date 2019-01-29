import { Injectable } from '@angular/core';
import { constant } from '../storage.constant';

@Injectable()
export class LocalStorageService {

    ls = window.localStorage;

    constructor() { }

    /**
     * 获取localstorage的值
     *
     * @param key
     */
    get(key: string): any {
        key = this.getKeyWithPrefix(key);
        let plainText = this.decrypt(this.ls.getItem(key));
        try {
            return JSON.parse(plainText);
        } catch (err) {
            return plainText;
        }
    }

    /**
     * 设置localstorage的值
     *
     * @param key
     * @param value
     */
    set(key: string, value: any) {
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        this.ls.setItem(this.getKeyWithPrefix(key), this.encrypt(value));
    }

    /**
     * 删除指定的key
     *
     * @param key
     */
    remove(key: string) {
        this.ls.removeItem(this.getKeyWithPrefix(key));
    }

    /**
     * 清空localstorage[与本工程相关的]
     */
    clear() {
        const delKeys = [], len = this.ls.length;
        for (let i = 0; i < len; i++) {
            const realKey = this.ls.key(i);
            if (realKey && realKey.indexOf(constant.identifier) === 0) {
                delKeys.push(realKey);
            }
        }

        delKeys.forEach(key => {
            this.ls.removeItem(key);
        });
    }

    /**
     * 获取完整key
     *
     * @param key
     */
    private getKeyWithPrefix(key: string): string {
        return `${constant.identifier}.${key}`;
    }

    /**
     * 加密
     *
     * @param code
     */
    private encrypt(code: string): string {
        if (!code) {
            return code;
        }
        return btoa(encodeURIComponent(code));
    }

    /**
     * 解密
     *
     * @param code
     */
    private decrypt(code: string): string {
        if (!code) {
            return code;
        }
        return decodeURIComponent(atob(code));
    }
}
