
```mermaid
classDiagram
PartFactory <|-- FourPosFactory 
JudgePersonalColorClass <|-- JudgeByHsbClass 
JudgePersonalColorClass <|--  JudgeByRatioClass 
PartFactory <|--  ThreePosFactory 

```

# Factory
```mermaid
classDiagram

class PartFactory {
  +PartFactory(cavas_image_data2d: object, randmark_positions: Array<object>, randmark_part_db: object, judge_ct: number)
  +get_part(part_id: string): object
  +add_positions(pos: object): void
  +clear_judge_positions(): void
  +get_judge_positions(): Array<object>
}

class FourPosFactory {
  +FourPosFactory()
  +get_part(part_id: string): Object
}

class ThreePosFactory {
  +ThreePosFactory()
  +get_part(part_id: string): object
}


```





# Judge

```mermaid
classDiagram


class JudgeFaceClass {
  +JudgeFaceClass(randmark_positions: Array<object>, width: number, height: number, scope_db: object)
  +get_judge_result(part: string): string
  +get_judge_score(part: string): number
  +judge_personal_color(part_id: string, factory: object): void
}

class JudgeFaceGuiClass {
  +JudgeFaceGuiClass()
  +boot_gui(): void
  +display_result(id: string, result_hoho: string, result_hoho_score: object): void
  +drow_judge_position(base_canvas: HTMLCanvasElement, detection: object, judge_positions: Array): void
  +photograph(): void
  +shutter(): void
}

class JudgeFaceStateClass {
  +JudgeFaceStateClass(items_tableopt:  object )
  +to_init(): void
  +to_photograph(): void
  +to_result(): void
  +to_selected(): void
}

# Judge Method
```mermaid
classDiagram

class JudgePersonalColorClass {
  +JudgePersonalColorClass

  (arg_part: object, part_scope_db: object)
  +get_scores(): object
}


class JudgeByHsbClass {
  +JudgeByHsbClass()
  +get_scores(): Object
}

class JudgeByRatioClass {
  +JudgeByRatioClass()
  +get_scores(): Object
}


```



```

# Face
```mermaid
classDiagram


class FaceApiClass {
  +FaceApiClass()
  +createCanvasFromMedia(start_img: HTMLMediaElement): HTMLCanvasElement
  +create_model(): void
  +detectAllFaces(start_img: HTMLMediaElement): Promise<void>
}

class FacePartClass {
  +FacePartClass(id: string, rgbs: Array<RgbClass>, rgb_scopes: object)
  +get_id(): string
  +get_rgbs(): Array<RgbClass>
}


```


# Else
```mermaid
classDiagram

class AnalyzeClass {
  +AnalyzeClass()
  +analyze(faceApiClass: FaceApiClass, start_img: HTMLMediaElement): Promise<void>
}

class RgbClass {
  +RgbClass(r: number, g: number, b: number)
}
```
