/**
 * SpreadObject<T>는 객체 타입 T를 "펼치는" 유틸리티 타입입니다.
 * T의 모든 값 타입의 유니온을 추출합니다.
 * 이는 중첩된 객체 타입을 평탄화하거나
 * 객체 속성에서 유니온 타입을 만드는 데 유용합니다.
 */
export type SpreadObject<T> = T extends {[K in keyof T]: infer U} ? U : never;
