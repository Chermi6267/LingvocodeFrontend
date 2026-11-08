from pathlib import Path
from lxml import etree
from docx import Document

path = Path(r"C:\Users\ivanb\OneDrive\Рабочий стол\Прог\JS React Native с TypeScript\Lingocode\LingvocodeFrontend\output\Оценка_точности_прямых_и_косвенных_измерений_исправлено.docx")

M = "http://schemas.openxmlformats.org/officeDocument/2006/math"
W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


def el(tag, text=None):
    node = etree.Element(f"{{{M}}}{tag}")
    if text is not None:
        node.text = text
    return node


def run(text):
    r = el("r")
    t = el("t", text)
    r.append(t)
    return r


def sub(base, index):
    node = el("sSub")
    e = el("e"); e.append(run(base))
    s = el("sub"); s.append(run(index))
    node.extend([e, s])
    return node


def sup(base, index):
    node = el("sSup")
    e = el("e"); e.append(run(base))
    s = el("sup"); s.append(run(index))
    node.extend([e, s])
    return node


def fraction(numerator, denominator):
    node = el("f")
    num = el("num")
    den = el("den")
    for item in numerator:
        num.append(item if not isinstance(item, str) else run(item))
    for item in denominator:
        den.append(item if not isinstance(item, str) else run(item))
    node.extend([num, den])
    return node


def equation(parts):
    math = el("oMath")
    for part in parts:
        math.append(part if not isinstance(part, str) else run(part))
    return math


def set_equation(p, parts):
    p.clear()
    p.alignment = 1
    p._p.append(equation(parts))


doc = Document(path)
formulas = {
    "d̄шц =": ["d̄", sub("шц", ""), " = ", fraction(["0,50 + 8·0,45 + 0,40"], ["10"]), " = 0,450 мм"],
    "d̄м =": ["d̄", sub("м", ""), " = ", fraction(["0,46 + 0,47 + 0,46 + 0,46 + 0,46 + 0,45 + 0,46 + 0,45 + 0,45 + 0,45"], ["10"]), " = 0,457 мм"],
    "Δdшц =": ["Δd", sub("шц", ""), " = 0,0100 мм; Δ", sub("прибор", "шц"), " = 0,050 мм"],
    "Δdм =": ["Δd", sub("м", ""), " = 0,0056 мм; Δ", sub("прибор", "м"), " = 0,010 мм"],
    "σdшц =": ["σd", sub("шц", ""), " = 0,0075 мм"],
    "σdм =": ["σd", sub("м", ""), " = 0,0021 мм"],
    "ρэ,шц =": [sub("ρ", "э,шц"), " = 1,044·10", sup("", "−6"), " Ом·м"],
    "ρэ,м =": [sub("ρ", "э,м"), " = 1,077·10", sup("", "−6"), " Ом·м"],
    "Δρшц =": ["Δ", sub("ρ", "шц"), " = 0,306·10", sup("", "−6"), " Ом·м"],
    "Δρм =": ["Δ", sub("ρ", "м"), " = 0,124·10", sup("", "−6"), " Ом·м"],
    "σρшц =": ["σ", sub("ρ", "шц"), " = 0,066·10", sup("", "−6"), " Ом·м"],
    "σρм =": ["σ", sub("ρ", "м"), " = 0,059·10", sup("", "−6"), " Ом·м"],
    "tg α = ΔR / Δl": ["tg α = ", fraction(["ΔR"], ["Δl"]), " = ", fraction(["4,17 − 1,25"], ["0,50 − 0,05"]), " = 6,49 Ом/м"],
    "При I = 0,240 А": [sub("U", "0"), " = I·", sub("R", "0"), " = 0,240·0,86 ≈ 0,207 В"],
    "Среднее напряжение непосредственно": ["Ū", sub("пров", ""), " = Ū − ", sub("U", "0"), " = 0,640 − 0,207 = 0,433 В"],
    "Для штангенциркуля (d̄ = 0,450": [sub("ρ", "гр"), " = ", fraction(["π·", sup("d", "2"), "·tg α"], ["4"]), " = 1,031·10", sup("", "−6"), " Ом·м"],
    "Для микрометра (d̄ = 0,457": [sub("ρ", "гр"), " = ", fraction(["π·", sup("d", "2"), "·tg α"], ["4"]), " = 1,063·10", sup("", "−6"), " Ом·м"],
    "Для штангенциркуля: ρэ =": [sub("ρ", "э"), " = ", fraction(["π·", sup("d", "2"), "·Ū", sub("пров", "")], ["4Īl̄"]), " = 1,044·10", sup("", "−6"), " Ом·м"],
    "ρэ = (1,044 ± 0,066)": [sub("ρ", "э"), " = (1,044 ± 0,066)·10", sup("", "−6"), " Ом·м"],
    "ρэ = (1,044 ± 0,306)": [sub("ρ", "э"), " = (1,044 ± 0,306)·10", sup("", "−6"), " Ом·м"],
    "Для микрометра: ρэ =": [sub("ρ", "э"), " = ", fraction(["π·", sup("d", "2"), "·Ū", sub("пров", "")], ["4Īl̄"]), " = 1,077·10", sup("", "−6"), " Ом·м"],
    "ρэ = (1,077 ± 0,059)": [sub("ρ", "э"), " = (1,077 ± 0,059)·10", sup("", "−6"), " Ом·м"],
    "ρэ = (1,077 ± 0,124)": [sub("ρ", "э"), " = (1,077 ± 0,124)·10", sup("", "−6"), " Ом·м"],
    "Для алгебраического метода": [fraction(["|", sub("ρ", "спр"), " − ", sub("ρ", "э"), "|"], [sub("ρ", "спр")]), "·100% = ", fraction(["|1,100 − 1,077|"], ["1,100"]), "·100% = 2,1%"],
    "Для графического метода": [fraction(["|", sub("ρ", "спр"), " − ", sub("ρ", "гр"), "|"], [sub("ρ", "спр")]), "·100% = ", fraction(["|1,100 − 1,063|"], ["1,100"]), "·100% = 3,3%"],
}

for p in doc.paragraphs:
    text = p.text.strip()
    for marker, parts in formulas.items():
        if text.startswith(marker):
            set_equation(p, parts)
            break

doc.save(path)
print(path)
