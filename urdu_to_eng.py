# import os, glob, datetime
# from deep_translator import GoogleTranslator
# from gtts import gTTS
# from voice_vision_llm.voice_of_the_patient import transcribe_with_groq
# import load_dotenv
# load_dotenv()

# async def urdu_audio_to_english_audio_async(urdu_audio_dir: str, user_name: str) -> tuple[str,str]:
#     # 1. find latest file (fast, no need for executor)
#     pattern = os.path.join(urdu_audio_dir, f"{user_name}_*_urdu.*")
#     matches = glob.glob(pattern)
#     if not matches:
#         raise FileNotFoundError("…")
#     latest_audio = max(matches, key=os.path.getmtime)

#     # 2. prepare paths
#     ts = datetime.datetime.now().strftime("%Y_%m_%d-%H_%M_%S")
#     base = os.environ.get("BASE_DIR", ".")
#     urdu_txt_dir = os.path.join(base, "urdu_text")
#     eng_txt_dir  = os.path.join(base, "english_text")
#     eng_aud_dir  = os.path.join(base, "user_english_audio")
#     for d in (urdu_txt_dir, eng_txt_dir, eng_aud_dir):
#         os.makedirs(d, exist_ok=True)

#     urdu_txt_path    = os.path.join(urdu_txt_dir,   f"{user_name}_{ts}_urdu.txt")
#     eng_txt_path     = os.path.join(eng_txt_dir,    f"{user_name}_{ts}_english.txt")
#     eng_audio_path   = os.path.join(eng_aud_dir,    f"{user_name}_{ts}_english.mp3")

#     # 3. transcribe (in thread‑pool)
#     urdu_text = await run_blocking(
#         transcribe_with_groq,
#         GROQ_API_KEY=os.environ["GROQ_API_KEY"],
#         audio_filepath=latest_audio,
#         stt_model="whisper-large-v3",
#         language="ur"
#     )
#     await run_blocking(lambda txt, path: open(path,"w",encoding="utf8").write(txt),
#                        urdu_text, urdu_txt_path)

#     # 4. translate
#     eng_text = await run_blocking(GoogleTranslator(source="ur", target="en").translate, urdu_text)
#     await run_blocking(lambda txt, path: open(path,"w",encoding="utf8").write(txt),
#                        eng_text, eng_txt_path)

#     # 5. text‑to‑speech
#     def synth_and_save(text, path):
#         tts = gTTS(text=text, lang="en")
#         tts.save(path)
#     await run_blocking(synth_and_save, eng_text, eng_audio_path)

#     return eng_audio_path, eng_text



from datetime import datetime
from deep_translator import GoogleTranslator
from gtts import gTTS
from dotenv import load_dotenv
from voice_vision_llm.voice_of_the_patient import transcribe_with_groq
import glob
import os
from werkzeug.utils import secure_filename

#safe_user = secure_filename(user_name)


load_dotenv()


def urdu_audio_to_english_audio(urdu_audio_dir: str, user_name: str) -> str:
    """
    Finds the most recent Urdu audio file for the given user in `urdu_audio_dir`,
    transcribes it via Groq, translates the text to English, synthesizes English
    speech via gTTS, and saves all artifacts using the naming convention:
      <user_name>_<YYYY_MM_DD-HH_MM_SS>_<type>.<ext>
    
    Artifacts are saved to:
      • Urdu text:      .../urdu_text/
      • English text:   .../english_text/
      • English audio:  .../user_english_audio/
    
    Returns the full path to the generated English audio file.
    """
    user_name=secure_filename(user_name)
    # 1. Locate the latest audio file for this user
    pattern = os.path.join(urdu_audio_dir, f"{user_name}_*_urdu.*")
    matches = glob.glob(pattern)
    if not matches:
        raise FileNotFoundError(f"No Urdu audio files found for user '{user_name}' in ", urdu_audio_dir)
    latest_audio = max(matches, key=os.path.getmtime)

    # 2. Prepare timestamp and output directories
    ts = datetime.now().strftime("%Y_%m_%d-%H_%M_%S")
    base_dir = r"C:\Users\Lenovo\Desktop\fyp2_final\fyp1_final"
    urdu_txt_dir   = os.path.join(base_dir, "urdu_text")
    eng_txt_dir    = os.path.join(base_dir, "english_text")
    eng_audio_dir  = os.path.join(base_dir, "english_audio")
    for d in (urdu_txt_dir, eng_txt_dir, eng_audio_dir):
        os.makedirs(d, exist_ok=True)

    # 3. Define output file paths
    urdu_txt_path    = os.path.join(urdu_txt_dir,   f"{user_name}_{ts}_urdu.txt")
    english_txt_path = os.path.join(eng_txt_dir,    f"{user_name}_{ts}_english.txt")
    english_audio_path = os.path.join(eng_audio_dir, f"{user_name}_{ts}_english.mp3")

    # 4. Transcribe Urdu audio → text
    urdu_text = transcribe_with_groq(
        GROQ_API_KEY=os.environ["GROQ_API_KEY"],
        audio_filepath=latest_audio,
        stt_model="whisper-large-v3",
        language="ur"
    )
    with open(urdu_txt_path, "w", encoding="utf-8") as f:
        f.write(urdu_text)

    # 5. Translate to English
    eng_text = GoogleTranslator(source="ur", target="en").translate(urdu_text)
    with open(english_txt_path, "w", encoding="utf-8") as f:
        f.write(eng_text)

    # 6. Synthesize English speech
    tts = gTTS(text=eng_text, lang="en")
    tts.save(english_audio_path)

    return english_audio_path, eng_text

# def urdu_audio_to_english_audio(
#     urdu_audio_path,
#     urdu_text_path,
#     english_text_path,
#     english_audio_path,userName) -> None:
#     """
#     1. Transcribe Urdu audio to Urdu text and save as urdu.txt
#     2. Translate Urdu text to English text and save as english.txt
#     3. Synthesize English text to English speech and save as MP3
#     """
#     # Step 1: Transcribe Urdu audio to Urdu text
#     urdu_text = transcribe_with_groq(
#     GROQ_API_KEY="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",
#     audio_filepath=urdu_audio_path,
#     stt_model="whisper-large-v3",   
#     language="ur"                   
# )

#     # Save Urdu text to file
#     with open(urdu_text_path, "w", encoding="utf-8") as f:
#         f.write(urdu_text)
#     print(f" Urdu text saved to: {urdu_text_path}")

#     # Step 2: Translate Urdu text to English
#     english_text = GoogleTranslator(source="ur", target="en").translate(urdu_text)

#     # Save English text to file
#     with open(english_text_path, "w", encoding="utf-8") as f:
#         f.write(english_text)
#     print(f" English text saved to: {english_text_path}")

#     # Step 3: Convert English text to English speech
#     tts = gTTS(text=english_text, lang="en")
#     tts.save(english_audio_path)
#     print(f" English audio saved to: {english_audio_path}")
    


# if __name__ == "__main__":
#     urdu_audio_to_english_audio()
