```mermaid
classDiagram

class AnalyzeClass {
  +AnalyzeClass()
  +analyze(faceApiClass: FaceApiClass, start_img: HTMLMediaElement): Promise<void>
}

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

class FourPosFactory {
  +FourPosFactory()
  +get_part(part_id: string): Object
}

```

```mermaid
classDiagram

class JudgeByHsbClass {
  +JudgeByHsbClass()
  +get_scores(): Object
}

class JudgeByRatioClass {
  +JudgeByRatioClass()
  +get_scores(): Object
}

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


```

```mermaid
classDiagram


class JudgeFaceStateClass {
  +JudgeFaceStateClass(items_tableopt: { Items_table: object })
  +to_init(): void
  +to_photograph(): void
  +to_result(): void
  +to_selected(): void
}

```



```mermaid
classDiagram

class JudgePersonalColorClass {
  +JudgePersonalColorClass(arg_part: object, part_scope_db: object)
  +get_scores(): object
}



class PartFactory {
  +PartFactory(cavas_image_data2d: object, randmark_positions: Array<object>, randmark_part_db: object, judge_ct: number)
  +get_part(part_id: string): object
  +add_positions(pos: object): void
  +clear_judge_positions(): void
  +get_judge_positions(): Array<object>
}

class RgbClass {
  +RgbClass(r: number, g: number, b: number)
}

class ThreePosFactory {
  +ThreePosFactory()
  +get_part(part_id: string): object
}

```



AnalyzeClass --|> FaceApiClass
FaceApiClass --|> FacePartClass
FacePartClass --|> FourPosFactory
FourPosFactory --|> JudgeByHsbClass
JudgeByHsbClass --|> JudgeByRatioClass
JudgeByRatioClass --|> JudgeFaceClass
JudgeFaceClass --|> JudgeFaceGuiClass
JudgeFaceClass --|> JudgeFaceStateClass
JudgeFaceClass --|> JudgePersonalColorClass
JudgeFaceClass --|> PartFactory
PartFactory --|> RgbClass
ThreePosFactory --|> PartFactory
