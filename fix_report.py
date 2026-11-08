from copy import deepcopy
from pathlib import Path

from docx import Document
from docx.shared import Pt

source = Path(r"C:\Users\ivanb\Downloads\Telegram Desktop\Оценка_точности_прямых_и_косвенных_измерений.docx")
target = Path(r"C:\Users\ivanb\OneDrive\Рабочий стол\Прог\JS React Native с TypeScript\Lingocode\LingvocodeFrontend\output\Оценка_точности_прямых_и_косвенных_измерений_исправлено.docx")
target.parent.mkdir(parents=True, exist_ok=True)


def set_text(paragraph, text):
    paragraph.clear()
    run = paragraph.add_run(text)
    run.font.name = "Times New Roman"
    run.font.size = Pt(14)


def insert_after(paragraph, text, heading=False):
    new_p = deepcopy(paragraph._p)
    paragraph._p.addnext(new_p)
    from docx.text.paragraph import Paragraph
    result = Paragraph(new_p, paragraph._parent)
    set_text(result, text)
    result.style = anchor.style if heading else doc.styles["Normal"]
    return result


doc = Document(source)

def full_text(paragraph):
    return "".join(node.text or "" for node in paragraph._p.iter() if node.tag.endswith("}t"))

# Correct the calculated diameter summary table from the raw ten measurements.
t3 = doc.tables[2]
for col, value in enumerate(["0,450", "0,0100", "0,0075", "0,0222", "0,0166"], start=1):
    t3.cell(2, col).text = value
for col, value in enumerate(["0,457", "0,0056", "0,0021", "0,0123", "0,0047"], start=1):
    t3.cell(3, col).text = value

# Correct every stale calculation in the calculation section.
calculation_replacements = {
    "d=1ni=1ndi=0,5": "d̄шц = (0,50 + 8·0,45 + 0,40) / 10 = 0,450 мм.",
    "d=1ni=1ndi=0,46": "d̄м = (0,46 + 0,47 + 0,46 + 0,46 + 0,46 + 0,45 + 0,46 + 0,45 + 0,45 + 0,45) / 10 = 0,457 мм.",
    "Δd=1ni=1nd-di= 0,095": "Δdшц = 0,0100 мм; итоговая приборная погрешность штангенциркуля равна 0,050 мм.",
    "Δd=1ni=1nd-di= 0,003": "Δdм = 0,0056 мм; итоговая приборная погрешность микрометра равна 0,010 мм.",
    "σd=1(n-1)i=1ndi-d2=1(10-1)i=110di-0,405": "σdшц = 0,0075 мм.",
    "σd=1(n-1)i=1ndi-d2=1(10-1)i=110di-0,457": "σdм = 0,0021 мм.",
    "ρэ=U⋅π⋅d24⋅I⋅l=0,10∙3,14∙(0,405": "ρэ,шц = 1,044·10⁻⁶ Ом·м (с учётом сопротивления контактов).",
    "ρэ=U⋅π⋅d24⋅I⋅l=0,10∙3,14∙(0,457": "ρэ,м = 1,077·10⁻⁶ Ом·м (с учётом сопротивления контактов).",
    "Δρ=ρэ⋅ΔUU+ΔII+Δll+2Δdd=0,322": "Δρшц = 0,306·10⁻⁶ Ом·м.",
    "Δρ=ρэ⋅ΔUU+ΔII+Δll+2Δdd=0,410": "Δρм = 0,124·10⁻⁶ Ом·м.",
    "σρ=ρэ⋅σII2+σUU2+σll2+2σdd2=0,322": "σρшц = 0,066·10⁻⁶ Ом·м.",
    "σρ=ρэ⋅σII2+σUU2+σll2+2σdd2=0,410": "σρм = 0,059·10⁻⁶ Ом·м.",
}
for p in doc.paragraphs:
    original = full_text(p)
    for marker, replacement in calculation_replacements.items():
        if original.startswith(marker):
            set_text(p, replacement)
            break

# Replace the stale calculations after the graph with a documented correction for contact resistance.
start = next(i for i, p in enumerate(doc.paragraphs) if p.text.strip() == "Анализ полученного результата")
end = next(i for i, p in enumerate(doc.paragraphs) if p.text.strip() == "Вывод")
anchor = doc.paragraphs[start]

replacement = [
    "Анализ полученного результата",
    "Экспериментальная зависимость сопротивления проволоки от её длины имеет линейный характер.",
    "tg α = ΔR / Δl = (4,17 − 1,25) / (0,50 − 0,05) = 6,49 Ом/м.",
    "График не проходит через начало координат. Свободный член линейной зависимости составляет приблизительно R₀ = 0,86 Ом. Он обусловлен сопротивлением контактов и соединительных проводов.",
    "При I = 0,240 А добавочное напряжение равно U₀ = I·R₀ = 0,240·0,86 ≈ 0,207 В.",
    "Среднее напряжение непосредственно на исследуемой проволоке: Ūпров = Ū − U₀ = 0,640 − 0,207 = 0,433 В.",
    "Для штангенциркуля (d̄ = 0,450 мм): ρгр = πd²tg α / 4 = 1,031·10⁻⁶ Ом·м.",
    "Для микрометра (d̄ = 0,457 мм): ρгр = πd²tg α / 4 = 1,063·10⁻⁶ Ом·м.",
    "Результат измерения удельного сопротивления",
    "Для штангенциркуля: ρэ = πd²Ūпров / (4Īl̄) = 1,044·10⁻⁶ Ом·м.",
    "ρэ = (1,044 ± 0,066)·10⁻⁶ Ом·м (по средней квадратичной погрешности).",
    "ρэ = (1,044 ± 0,306)·10⁻⁶ Ом·м (по абсолютной погрешности).",
    "Для микрометра: ρэ = πd²Ūпров / (4Īl̄) = 1,077·10⁻⁶ Ом·м.",
    "ρэ = (1,077 ± 0,059)·10⁻⁶ Ом·м (по средней квадратичной погрешности).",
    "ρэ = (1,077 ± 0,124)·10⁻⁶ Ом·м (по абсолютной погрешности).",
    "Сравнение полученных результатов с табличными значениями",
    "Для нихрома табличное удельное сопротивление находится в интервале (1,00–1,20)·10⁻⁶ Ом·м. Примем среднее табличное значение: ρспр = 1,100·10⁻⁶ Ом·м.",
    "Поскольку микрометр является более точным прибором, сравнение проведём по его результатам.",
    "Для алгебраического метода: |ρспр − ρэ| / ρспр · 100% = |1,100 − 1,077| / 1,100 · 100% = 2,1%.",
    "Для графического метода: |ρспр − ρгр| / ρспр · 100% = |1,100 − 1,063| / 1,100 · 100% = 3,3%.",
    "Полученные результаты хорошо согласуются с табличным значением удельного сопротивления нихрома. Небольшое расхождение связано с погрешностями измерительных приборов, неоднородностью проволоки и сопротивлением контактов электрической цепи.",
]

# Clear every old calculation paragraph through the section before the conclusion.
for p in doc.paragraphs[start:end]:
    set_text(p, "")

set_text(anchor, replacement[0])
last = anchor
for text in replacement[1:]:
    last = insert_after(last, text, heading=text in {
        "Результат измерения удельного сопротивления",
        "Сравнение полученных результатов с табличными значениями",
    })

# Replace the stale conclusion with a conclusion matching the new calculated results.
conclusion = next(p for p in doc.paragraphs if p.text.strip() == "Вывод")
idx = next(i for i, p in enumerate(doc.paragraphs) if p.text.strip() == "Вывод")
if idx + 1 < len(doc.paragraphs):
    set_text(doc.paragraphs[idx + 1], "В ходе лабораторной работы были обработаны результаты прямых и косвенных измерений. Установлено, что сопротивление исследуемой проволоки линейно возрастает с увеличением её длины. С учётом сопротивления контактов получены значения удельного сопротивления, близкие к табличному значению для нихрома. Расхождения результатов, полученных алгебраическим и графическим методами с табличным значением, составили 2,1% и 3,3% соответственно.")

doc.save(target)
print(target)
