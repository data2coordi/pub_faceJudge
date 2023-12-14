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

class JudgeFaceStateClass {
  +JudgeFaceStateClass(items_tableopt: { Items_table?: any })
  +to_init(): void
  +to_photograph(): void
  +to_result(): void
  +to_selected(): void
}

```




class JudgePersonalColorClass {
  +JudgePersonalColorClass(arg_part: object, part_scope_db: object)
  +get_scores(): object
}





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
