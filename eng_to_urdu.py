import os
import datetime
from deep_translator import GoogleTranslator
from gtts import gTTS

def english_text_to_urdu_audio(
    english_text: str,
    user_name: str
) -> tuple[str, str]:
    """
    Pipeline: English text → translate to Urdu text → synthesize Urdu audio.

    1. Accepts raw English text.
    2. Saves English text to english_text/ directory.
    3. Translates English text to Urdu via GoogleTranslator.
    4. Saves Urdu text to urdu_text/ directory.
    5. Synthesizes Urdu speech via gTTS.
    6. Saves Urdu audio to user_urdu_audio/ directory.

    Filenames use: <user_name>_<YYYY_MM_DD-HH_MM_SS>_<system>.<ext>
      where system ∈ {"english", "urdu"} and ext is .txt or .mp3

    Returns:
      (path_to_urdu_audio, urdu_text)
    """
    # 1. Prepare timestamp and directories
    ts = datetime.datetime.now().strftime("%Y_%m_%d-%H_%M_%S")
    base_dir = os.environ.get("BASE_DIR", os.getcwd())
    eng_txt_dir = os.path.join(base_dir, "english_text")
    urdu_txt_dir = os.path.join(base_dir, "urdu_text")
    urdu_audio_dir = os.path.join(base_dir, "user_urdu_audio")
    for d in (eng_txt_dir, urdu_txt_dir, urdu_audio_dir):
        os.makedirs(d, exist_ok=True)

    # 2. Define artifact paths
    eng_txt_path = os.path.join(eng_txt_dir, f"{user_name}_{ts}_system_english.txt")
    urdu_txt_path = os.path.join(urdu_txt_dir, f"{user_name}_{ts}_system_urdu.txt")
    urdu_audio_path = os.path.join(urdu_audio_dir, f"{user_name}_{ts}_system_urdu.mp3")

    # 3. Save English text
    with open(eng_txt_path, "w", encoding="utf-8") as f:
        f.write(english_text)

    # 4. Translate English → Urdu text
    urdu_text = GoogleTranslator(source="en", target="ur").translate(english_text)
    with open(urdu_txt_path, "w", encoding="utf-8") as f:
        f.write(urdu_text)

    # 5. Synthesize Urdu speech
    tts = gTTS(text=urdu_text, lang="ur")
    tts.save(urdu_audio_path)

    return urdu_audio_path, urdu_text
